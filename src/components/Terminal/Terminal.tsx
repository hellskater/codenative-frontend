import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

type TerminalProps = {
  socket: Socket | null;
  refreshOutput: any;
  editorRows: number;
};

function Terminal(props: TerminalProps) {
  const terminalDivRef = useRef<HTMLDivElement>(null);

  const [terminal, setTerminal] = useState<any>(null);

  useEffect(() => {
    const initTerminal = async () => {
      const { Terminal } = await import('xterm');
      const term = new Terminal({
        rows: props.editorRows,
        cursorBlink: true,
        theme: {
          background: '#16191d',
          foreground: '#F5F8FA'
        }
      });

      term.onData(() => {
        props.refreshOutput(true);
      });
      setTerminal(term);
    };
    initTerminal();
  }, []);

  useEffect(() => {
    terminal && terminal.resize(60, props.editorRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.editorRows]);

  useEffect(() => {
    const socket = props.socket;

    if (socket && terminal) {
      terminal.open(terminalDivRef.current!);

      socket.on('output', data => {
        terminal.write(data);
      });

      terminal.onData((data: any) => {
        socket!.emit('input', data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, terminal]);

  return (
    <div
      className="terminal flex h-full w-full items-center justify-center text-xl"
      ref={terminalDivRef}
    >
      {!props.socket && 'Initializing terminal 🚀  ...'}
    </div>
  );
}

export default Terminal;
