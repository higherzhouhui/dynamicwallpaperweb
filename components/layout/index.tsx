import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {useRouter} from 'next/router';
import {memo, useEffect} from 'react';

import Footer from './footer/index';
import Header from './header/index';
import {ListLayout} from './ListLayout';
import {LayoutContainer, LayoutMainContentContainer} from './styles';

import {loginWeb, logOutWeb,getIp} from '@/services/common';
import {progressInit} from '@/utils';
import {getBrowserTimezone} from '@/utils/timezone';
import {getScreenInfo} from '@/utils/screen';

export const Layout = memo(({children}) => {
  const router = useRouter();
  let data = {}
  const judgeHasUuid = async(callBack: any) => {
    try {
      const res: any = await getIp();
      const ip = res.query;
      const address = `${res.country}-${res.city}`
      data = {
        ip,
        address,
      }
      if (!localStorage.getItem('uuid')) {
        FingerprintJS.load().then((fp) => {
          fp.get().then((result) => {
            const visitorId = result.visitorId;
            localStorage.setItem('uuid', visitorId);
            callBack(data);
          });
        });
      } else {
        callBack(data);
      }
    } catch (error) {
      if (!localStorage.getItem('uuid')) {
        FingerprintJS.load().then((fp) => {
          fp.get().then((result) => {
            const visitorId = result.visitorId;
            localStorage.setItem('uuid', visitorId);
            callBack(data);
          });
        });
      } else {
        callBack(data);
      }
    }
  };

  const iLoginWeb = (data: any) => {
    const originUrl = document.referrer || 'direct';
    const uuid = localStorage.getItem('uuid') || '';
    let platform = 'Windows';
    
    try {
      platform = (navigator as any).userAgentData.platform;
    } catch (error) {
      // 降级处理，使用userAgent判断
      const userAgent = navigator.userAgent;
      if (userAgent.includes('Mac')) {
        platform = 'macOS';
      } else if (userAgent.includes('Linux')) {
        platform = 'Linux';
      } else if (userAgent.includes('Android')) {
        platform = 'Android';
      } else if (userAgent.includes('iOS')) {
        platform = 'iOS';
      }
    }
    
    // 获取浏览器时区
    const timezoneInfo = getBrowserTimezone();
    
    // 获取屏幕信息
    const screenInfo = getScreenInfo();
    
    loginWeb({
      deviceType: navigator.userAgent,
      lang: navigator.language,
      platform,
      timezone: timezoneInfo.timezone,
      screenResolution: `${screenInfo.width}x${screenInfo.height}`,
      comeTime: new Date().getTime(),
      uuid,
      originUrl,
      id: sessionStorage.getItem('id') || undefined,
      ...data,
    }).then((res: any) => {
      if (res.code === 200 && res.data.id) {
        sessionStorage.setItem('id', res.data.id)
      } else {
        console.log(res);
      }
    });
  };

  const iLogOutWeb = () => {
    if (!localStorage.getItem('uuid') && !sessionStorage.getItem('id')) {
      return;
    }
    logOutWeb({
      leaveTime: new Date().getTime(),
      uuid: localStorage.getItem('uuid') || '',
      id: sessionStorage.getItem('id') || '',
    }).then((res: any) => {
      if (res.code === 200) {
        localStorage.removeItem('uuid');
      }
    });
  };

  useEffect(() => {
    progressInit(router);
    judgeHasUuid(iLoginWeb);
    const listener = (e: any): void => {
      iLogOutWeb();
    };
    window.addEventListener('beforeunload', listener);
  }, []);
  return (
    <>
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
