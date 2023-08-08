import Head from 'next/head';
import {useRouter} from 'next/router';
import {memo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import Footer from './footer/index';
import Header from './header/index';
import {ListLayout} from './ListLayout';
import {LayoutContainer, LayoutMainContentContainer} from './styles';

import {progressInit} from '@/utils';

export const Layout = memo(({children}) => {
  const {t} = useTranslation();
  const router = useRouter();
  useEffect(() => {
    progressInit(router);
  }, []);
  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
      </Head>
      <Header />
      <LayoutContainer>
        <LayoutMainContentContainer id='layout-main-content'>
          <ListLayout>{children}</ListLayout>
        </LayoutMainContentContainer>
      </LayoutContainer>
      <Footer />
    </>
  );
});

Layout.displayName = 'Layout';
