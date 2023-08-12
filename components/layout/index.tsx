import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {memo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import Footer from './footer/index';
import Header from './header/index';
import {ListLayout} from './ListLayout';
import {LayoutContainer, LayoutMainContentContainer} from './styles';

import {loginWeb, logOutWeb} from '@/services/common';
import {progressInit} from '@/utils';

export const Layout = memo(({children}) => {
  const {t} = useTranslation();
  const router = useRouter();

  const judegeHasUuid = (callBack: any) => {
    if (!localStorage.getItem('uuid')) {
      FingerprintJS.load().then((fp) => {
        fp.get().then((result) => {
          const visitorId = result.visitorId;
          localStorage.setItem('uuid', visitorId);
          callBack();
        });
      });
    } else {
      callBack();
    }
  };

  const iLoginWeb = () => {
    const uuid = localStorage.getItem('uuid') || '';
    loginWeb({
      shebei: navigator.userAgent,
      lang: navigator.language,
      comeTime: new Date().getTime(),
      uuid,
    }).then((res: any) => {
      if (res.code === 200) {
        console.log('success');
      } else {
        console.log(res);
      }
    });
  };

  const iLogOutWeb = () => {
    if (!localStorage.getItem('uuid')) {
      return;
    }
    logOutWeb({
      leaveTime: new Date().getTime(),
      uuid: localStorage.getItem('uuid') || '',
    }).then((res: any) => {
      if (res.code === 200) {
        localStorage.removeItem('uuid');
      }
    });
  };

  useEffect(() => {
    progressInit(router);
    judegeHasUuid(iLoginWeb);
    const listener = (e: any): void => {
      iLogOutWeb();
    };
    window.addEventListener('beforeunload', listener);
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
      {router.pathname !== '/admin' && <Footer />}
    </>
  );
});

Layout.displayName = 'Layout';
