import React from 'react';
import CodeLineLoader from './CodeLineLoader';

const CodeEditorLoader = () => {
  return (
    <div className="ml-3 h-fit">
      {[...Array(20)].map((_, index) => (
        <CodeLineLoader key={index} />
      ))}
    </div>
  );
};

export default CodeEditorLoader;
