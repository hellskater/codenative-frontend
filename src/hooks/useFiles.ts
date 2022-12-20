import { useMutation, useQuery } from 'urql';

// ------------------- GET FILES -------------------

type GetFilesInputType = {
  user: string;
  projectName: string;
};

const GetFilesQuery = ({ user, projectName }: GetFilesInputType) => {
  return `
query {
    getFiles(input: {projectName: "${projectName}", user: "${user}"}) {
      name, content
    }
  }
`;
};

export const useGetFiles = (inputData: GetFilesInputType) => {
  const [result, reexecuteQuery] = useQuery({
    query: GetFilesQuery(inputData),
    pause: true
  });

  const { data, fetching, error } = result;

  return { data, fetching, error, reexecuteQuery };
};

// -------------------- POST FILES ---------------------

// eslint-disable-next-line
type FileInputType = {
  name: string;
  type: string;
  content: string;
};

const PostFilesQuery = `
    mutation ($user: String!, $projectName: String!, $files: [FileInputType!]!) {
        saveFiles(
          input: { projectName: $projectName, user: $user, files: $files }
        ) 
      }`;

export const usePostFiles = () => {
  const [result, postFiles] = useMutation(PostFilesQuery);

  const { data, fetching, error } = result;

  return { data, fetching, error, postFiles };
};
