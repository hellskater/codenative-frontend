import ContentLoader from 'react-content-loader';

const FileCardLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2.5}
      width="10rem"
      height="1rem"
      backgroundColor="rgb(31 41 55)"
      foregroundColor="rgb(55 65 81)"
      className="bg-glass-light my-2 overflow-hidden rounded-sm"
      {...props}
    >
      <rect width="100%" height="100%" />
    </ContentLoader>
  );
};

export default FileCardLoader;
