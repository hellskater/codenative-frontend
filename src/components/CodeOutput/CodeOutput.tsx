import { useRef } from 'react';
import { MdRefresh } from 'react-icons/md';

type Props = {
  iFrameKey: number;
  src: string | undefined;
  refreshOutput: any;
};

function CodeOutput({ iFrameKey, src, refreshOutput }: Props) {
  const codeOutputRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="h-full w-full bg-white">
      <div className="flex w-full items-center bg-gray-800 p-2 text-black">
        <MdRefresh
          className="cursor-pointer text-2xl text-white hover:text-gray-400"
          onClick={refreshOutput}
        />
        <input
          type="text"
          value={src}
          readOnly
          className="ml-2 h-full w-full rounded-full py-1 px-3 outline-none"
        />
      </div>
      <iframe
        key={iFrameKey}
        name={iFrameKey.toString()}
        ref={codeOutputRef}
        className="h-full w-full"
        title="Output"
        src={src ? `${src}?cacheBurst=${iFrameKey}` : undefined}
      ></iframe>
    </div>
  );
}

export default CodeOutput;
