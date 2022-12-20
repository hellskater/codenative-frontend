import ContentLoader from 'react-content-loader';

const PlaygroundCardLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2.5}
      width="10rem"
      height="4rem"
      backgroundColor="rgb(31 41 55)"
      foregroundColor="rgb(55 65 81)"
      className="bg-glass-light my-2 overflow-hidden rounded-lg"
      {...props}
    >
      <rect rx="15" ry="15" width="100%" height="100%" />
    </ContentLoader>
  );
};

export default PlaygroundCardLoader;
