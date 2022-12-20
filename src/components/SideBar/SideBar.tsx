import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Files } from '@interfaces/index';
import FileCardLoader from './FileCardLoader';
import Link from 'next/link';

type SideBarProps = {
  socket: Socket | null;
  updateCurrentFile: any;
  addFile: any;
  refreshOutput: any;
};

const extensions: { [x: string]: string } = {
  js: 'javascript',
  ts: 'typescript',
  css: 'css3',
  html: 'html5'
};

const SideBar = ({
  socket,
  addFile,
  refreshOutput,
  updateCurrentFile
}: SideBarProps) => {
  const [files, setFiles] = useState<Files[]>([]);
  const [addingNewFile, setAddingNewFile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const addFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function getFiles(data: string) {
      const response = JSON.parse(data);
      const { files } = response;

      if (files) {
        setFiles(files);
        setIsLoading(false);
      }
    }

    if (socket) {
      socket.off('fileOutput', getFiles).on('fileOutput', getFiles);
      socket.on('watcher', getFiles);

      socket.emit('fileInput', JSON.stringify({ request: 'list' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    refreshOutput(true);
  }, [files]);

  function deleteFile(name: string) {
    socket?.emit('fileInput', JSON.stringify({ request: 'delete', name }));
  }

  function handleFileAdd() {
    socket?.emit(
      'fileInput',
      JSON.stringify({
        request: 'create',
        name: addFileInputRef.current?.value
      })
    );
    setAddingNewFile(false);
    addFile({
      name: addFileInputRef.current?.value,
      content: ''
    });
  }

  return (
    <>
      <div className="flex h-full">
        <div className="sidebarOptions">
          <Link href="/">
            <div className="option">
              <img
                src="/codenative.ico"
                alt="codenative logo"
                className="mx-auto my-1 h-6 w-6 object-contain"
              />
            </div>
          </Link>
          <div className="option optionSelected">
            <div className="icon codicon codicon-files"></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="sidebarContents">
            <div
              className="filesContainer 
                     flex w-full items-center justify-between p-2"
            >
              <p className="text-xs font-bold">FILES</p>
              <div
                className="codicon codicon-new-file cursor-pointer"
                onClick={() => {
                  setAddingNewFile(true);
                  setTimeout(() => {
                    addFileInputRef.current?.focus();
                  }, 1);
                }}
                onKeyDown={() => {
                  setAddingNewFile(true);
                  setTimeout(() => {
                    addFileInputRef.current?.focus();
                  }, 1);
                }}
                role="button"
                tabIndex={0}
              ></div>
            </div>

            <div className="py-2 px-4">
              {addingNewFile && (
                <div
                  onKeyDown={event => {
                    if (event.code === 'Enter') {
                      handleFileAdd();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="file flex cursor-pointer items-center justify-between"
                >
                  <div className="flex flex-1 items-center">
                    <input
                      ref={addFileInputRef}
                      type="text"
                      className="w-full bg-transparent p-0"
                    />
                    {/* <p className="ml-1.5 text-sm"></p> */}
                  </div>
                  <div>
                    <div
                      className="codicon codicon-close ml-2"
                      onClick={() => {
                        setAddingNewFile(false);
                      }}
                      onKeyDown={() => {
                        setAddingNewFile(false);
                      }}
                      role="button"
                      tabIndex={0}
                    ></div>
                  </div>
                </div>
              )}

              {!isLoading &&
                files.map(element => {
                  const splittedName = element.name.split('.');
                  const extension = splittedName[splittedName.length - 1];

                  const mappedName = extensions[extension];

                  const imageSrc = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${mappedName}/${mappedName}-original.svg`;

                  return (
                    <div
                      className="file flex cursor-pointer items-center justify-between"
                      key={element.name}
                    >
                      <div
                        className="flex flex-1 items-center"
                        onClick={() => {
                          updateCurrentFile(element.name);
                        }}
                        onKeyDown={() => {
                          updateCurrentFile(element.name);
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <img src={imageSrc} className="w-5" alt="file icon" />
                        <p className="ml-1.5">{element.name}</p>
                      </div>

                      <div>
                        <div
                          className="codicon codicon-trash ml-2"
                          onClick={() => {
                            deleteFile(element.name);
                          }}
                          onKeyDown={() => {
                            deleteFile(element.name);
                          }}
                          role="button"
                          tabIndex={0}
                        ></div>
                      </div>
                    </div>
                  );
                })}

              {isLoading && (
                <div>
                  {[...Array(3)].map((_, index) => (
                    <FileCardLoader key={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
