import React, { ReactNode } from 'react';

import { Toaster } from 'react-hot-toast';

import Header from '@components/Header/Header';
import { useRouter } from 'next/router';

type props = {
  children: typeof React.Children | ReactNode;
};

// Wrapper component for common stylings and configurations across the app

const Layout = ({ children }: props) => {
  const router = useRouter();
  return (
    <div
      className={`bg-color pb-safe relative z-[999] h-screen min-h-screen w-full overflow-y-auto overflow-x-hidden text-white`}
    >
      <div>
        {!router.pathname.includes('/playground/') && (
          <div className="fixed top-0 z-10">
            <Header />
          </div>
        )}
        <Toaster position="bottom-right" />

        {/* Render the children */}
        <>{children}</>
      </div>
    </div>
  );
};

export default Layout;
