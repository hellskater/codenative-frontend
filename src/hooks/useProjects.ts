import { useQuery } from 'urql';

// ------------------- GET FILES -------------------

const GetProjectsQuery = (user: string) => {
  return `
query {
    getProjects(input: {user: "${user}"})
  }
`;
};

export const useGetProjects = (user: string) => {
  const [result, reexecuteQuery] = useQuery({
    query: GetProjectsQuery(user)
  });

  const { data, fetching, error } = result;

  return { data, fetching, error, reexecuteQuery };
};
