import Editor, { Monaco } from '@monaco-editor/react';
import { useRef } from 'react';
import { Socket } from 'socket.io-client';

type Props = {
  currentFile: string;
  currentFileContent: string;
  currentFileLanguage: string;
  socket: Socket | null;
  updateFile: any;
  refreshOutput: any;
};

function CodeEditor(props: Props) {
  const monacoRef = useRef<Monaco | null>(null);
  const editorRef = useRef<any | null>(null);

  let timer: any;

  const init = async (editor: any, monaco: Monaco) => {
    monaco.languages.register({ id: 'javascript' });
    monaco.languages.register({ id: 'typescript' });
    monaco.languages.register({ id: 'html' });
    monaco.languages.register({ id: 'css' });
  };

  const editorOnMount = (editor: any, monaco: Monaco) => {
    monacoRef.current = monaco;
    editorRef.current = editor;

    init(editorRef.current, monacoRef.current);
  };

  const editorOnChange = (value: string | undefined) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (props.socket) {
        const socket = props.socket;

        socket.emit(
          'fileInput',
          JSON.stringify({
            request: 'update',
            name: props.currentFile,
            content: value
          })
        );

        props.updateFile(value || '');
      }

      props.refreshOutput(false);
    }, 1000);
  };

  return (
    <Editor
      className="overflow-hidden"
      onMount={editorOnMount}
      onChange={editorOnChange}
      height="100%"
      theme="vs-dark"
      path={props.currentFile}
      value={props.currentFileContent}
      language={props.currentFileLanguage}
      defaultLanguage={props.currentFileLanguage}
    />
  );
}

export default CodeEditor;
