import ContentLoader from 'react-content-loader';

const CodeLineLoader = (props: any) => {
  // Write a function to return a random number between 5 to 30
  const random = () => Math.floor(Math.random() * 25) + 5;

  return (
    <ContentLoader
      speed={2.5}
      width={`${random()}rem`}
      height="0.6rem"
      backgroundColor="rgb(31 41 55)"
      foregroundColor="rgb(55 65 81)"
      className="my-2 overflow-hidden rounded-sm"
      {...props}
    >
      <rect width="100%" height="100%" />
    </ContentLoader>
  );
};

export default CodeLineLoader;
