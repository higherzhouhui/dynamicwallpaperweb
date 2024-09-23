import Head from 'next/head';

import type {AppProps} from 'next/app';

import {Layout, Message} from '@/components';
import Providers from '@/context';
import {GlobalStyle} from '@/styles/global';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
      </Head>
      <Providers>
        <GlobalStyle />
        <Message />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
}

export default MyApp;
