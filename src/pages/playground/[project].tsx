import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';

import SideBar from '@components/SideBar/SideBar';

import Terminal from '@components/Terminal/Terminal';

import CodeOutput from '@components/CodeOutput/CodeOutput';

import CodeEditor from '@components/CodeEditor/CodeEditor';

import { Files } from '@interfaces/index';
import { NextPage } from 'next';
import axios from '@utils/axios';
import { useGetFiles, usePostFiles } from '@hooks/useFiles';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true
  });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [appDomain, setAppDomain] = useState<string>();
  const [files, setFiles] = useState<Files[]>([]);

  const [currentFile, setCurrentFile] = useState<string>('');
  const [currentFileContent, setCurrentFileContent] = useState<string>('');
  const [currentFileLanguage, setCurrentFileLanguage] = useState<string>('');
  const [iFrameKey, setIFrameKey] = useState(Math.random());
  const [editorRows, setEditorRows] = useState(10);

  const user = session?.user?.name as string;
  const projectName = router?.query?.project as string;

  const {
    data: filesData,
    reexecuteQuery: fetchFiles,
    error: isFilesFetchingError
  } = useGetFiles({
    user,
    projectName
  });

  const { postFiles } = usePostFiles();

  let timer: any;

  const componentCleanup = () => {
    const taskArn = localStorage.getItem('taskId');
    axios
      .post('ip/destroy', {
        taskArn
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Successfully destroyed the task');
        localStorage.removeItem('taskId');
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        localStorage.removeItem('taskId');
      });
    localStorage.setItem('leftPlayground', 'true');
  };

  useEffect(() => {
    const getIp = async () => {
      axios
        .post('ip/get', {
          user,
          projectName
        })
        .then(res => {
          const ipData = res?.data?.data;
          if (ipData) {
            const { urls, taskArn } = ipData;
            const { api, preview } = urls;
            const terminalSocket = io(api, {
              forceNew: false
            });
            setSocket(terminalSocket);
            setAppDomain(preview);
            localStorage.setItem('taskId', taskArn);
          } else return;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    };

    getIp();

    window.addEventListener('beforeunload', componentCleanup);

    return () => {
      componentCleanup();
      window.removeEventListener('beforeunload', componentCleanup);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (files.length > 0) {
      if (!currentFile) updateCurrentFile(files[0].name);
      refreshOutput(false);
    }
  }, [files]);

  useEffect(() => {
    if (socket) {
      // Fetch Already Existing Files
      fetchFiles();

      socket.on('fileOutput', () => {
        socket.emit(
          'fileInput',
          JSON.stringify({
            request: 'content'
          })
        );
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (socket) {
      if (isFilesFetchingError) {
        return;
      }
      if (filesData) {
        const files = filesData.getFiles;

        if (files) {
          files.forEach((file: any) => {
            socket!.emit(
              'fileInput',
              JSON.stringify({
                name: file.name,
                content: file.content,
                request: 'update'
              })
            );
          });

          setFiles(files);
          return;
        }
        // Save fetched files to database
        else {
          socket.on('fileOutputWithContent', data => {
            const parsed = JSON.parse(data);
            const fAndFolders = parsed.files;
            setFiles(fAndFolders);

            postFiles({
              files: fAndFolders,
              projectName,
              user
            }).catch(err => {
              // eslint-disable-next-line no-console
              console.error(err);
            });
          });
        }
      }
    }
  }, [isFilesFetchingError, filesData]);

  function updateCurrentFile(file: string) {
    const currFile = files.find(f => {
      return f.name === file;
    });

    if (currFile) {
      setCurrentFile(file);

      const splitted = file.split('.');
      const extension = splitted[splitted.length - 1];

      setCurrentFileContent(currFile.content);

      switch (extension) {
        case 'js':
          setCurrentFileLanguage('javascript');
          break;
        case 'ts':
          setCurrentFileLanguage('typescript');
          break;
        case 'html':
          setCurrentFileLanguage('html');
          break;
        case 'css':
          setCurrentFileLanguage('css');
          break;
        default:
          setCurrentFileLanguage('typescript');
          break;
      }
    }
  }

  function updateFile(value: string) {
    const file = files.find(file => file.name === currentFile);

    if (file) {
      file.content = value;
    }
  }

  function refreshOutput(delay = false) {
    if (timer) {
      clearTimeout(timer);
    }

    if (delay) {
      timer = setTimeout(() => {
        setIFrameKey(Math.random());
      }, 5000);
    } else {
      setIFrameKey(Math.random());
    }
  }

  function addFile(file: any) {
    const fAndFolders = files;
    fAndFolders.push(file);

    setFiles(fAndFolders);
  }

  return (
    <div className="windowContainer">
      <Head>
        <title>Playground</title>
        <link rel="icon" href="/codenative.ico" />
      </Head>
      <ReflexContainer orientation="horizontal">
        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement minSize={50} flex={0.28}>
              <SideBar
                addFile={addFile}
                updateCurrentFile={updateCurrentFile}
                socket={socket}
                refreshOutput={refreshOutput}
              />
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement flex={0.65}>
              <ReflexContainer orientation="horizontal">
                <ReflexElement flex={0.8}>
                  {currentFile && (
                    <CodeEditor
                      refreshOutput={refreshOutput}
                      updateFile={updateFile}
                      socket={socket}
                      currentFileContent={currentFileContent}
                      currentFileLanguage={currentFileLanguage}
                      currentFile={currentFile}
                    ></CodeEditor>
                  )}
                </ReflexElement>
                <ReflexSplitter />
                <ReflexElement
                  className="terminalContainer"
                  minSize={80}
                  maxSize={730}
                  flex={0.2}
                  onResize={event => {
                    const el = event.domElement as Element;
                    const rows = Math.floor(el.clientHeight / 18);
                    setEditorRows(rows);
                  }}
                >
                  <Terminal
                    editorRows={editorRows}
                    refreshOutput={refreshOutput}
                    socket={socket}
                  ></Terminal>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement flex={0.5}>
              <CodeOutput
                iFrameKey={iFrameKey}
                src={appDomain}
                refreshOutput={refreshOutput}
              ></CodeOutput>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

export default Home;
