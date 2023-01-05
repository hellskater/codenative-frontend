import { useRef } from 'react';
import { MdRefresh } from 'react-icons/md';
import CodenativeIcon from '../../../public/codenative.ico';
import { FiRefreshCw } from 'react-icons/fi';

type Props = {
  iFrameKey: number;
  src: string | undefined;
  refreshOutput: any;
  isSidebarLoading: boolean;
};

function CodeOutput({
  iFrameKey,
  src,
  refreshOutput,
  isSidebarLoading
}: Props) {
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

      {isSidebarLoading ? (
        <div className="flex h-full w-full items-center justify-center bg-black text-white">
          <div className="flex flex-col items-center">
            <img
              src={CodenativeIcon.src}
              alt="icon"
              className="h-36 w-36 animate-bounce object-contain"
            />
            <div className="mt-5 flex items-center gap-3 text-xl">
              <FiRefreshCw className="animate-spin" />
              <p>Booting Container</p>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          key={iFrameKey}
          name={iFrameKey.toString()}
          ref={codeOutputRef}
          className="h-full w-full"
          title="Output"
          src={src ? `${src}?cacheBurst=${iFrameKey}` : undefined}
        ></iframe>
      )}
    </div>
  );
}

export default CodeOutput;
