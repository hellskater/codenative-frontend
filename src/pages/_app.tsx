import '../styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import NextProgress from 'next-progress';
import { MantineProvider } from '@mantine/core';

import { SessionProvider } from 'next-auth/react';
import Layout from '@components/Layout/Layout';

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <NextProgress delay={300} options={{ showSpinner: false }} />
        <SessionProvider session={session}>
          {/* Common wrapper for all the components for common styling and configs */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </MantineProvider>
  );
}
