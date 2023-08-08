import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {FooterContainer} from './styles';

import type {NextPage} from 'next';

import i18n from '@/locales/config';

const Footer: NextPage = () => {
  const lang = i18n.language;
  const {t} = useTranslation();
  const staticList = [
    {
      href: 'https://apps.apple.com/cn/app/%E5%8A%A8%E6%80%81%E5%A3%81%E7%BA%B8%E5%BC%95%E6%93%8Edynamic-wallpaper-engine/id1453504509?mt=12',
      logo: '/static/icon/apple.png',
      title: t('appleZh'),
    },
    {
      href: 'https://apps.apple.com/app/id1453504509',
      logo: '/static/icon/apple.png',
      title: t('Mac App Store'),
    },
    {
      href: 'https://cloud.tencent.com/developer/article/2257035',
      logo: '/static/icon/txy.png',
      title: t('tengxy'),
    },
    {
      href: 'https://www.google.com.hk/search?q=mac%E5%8A%A8%E6%80%81%E5%A3%81%E7%BA%B8&newwindow=1&ei=MnjQZOy9N5ibptQP4vCo6A8&start=0&sa=N&ved=2ahUKEwjsntvw38mAAxWYjYkEHWI4Cv04FBDy0wN6BAgEEAQ&biw=1920&bih=929&dpr=1#fpstate=ive&vld=cid:e066cdf9,vid:ztww0W6Z3A8',
      logo: '/static/icon/ytb.png',
      title: t('YouTube'),
    },
    {
      href: 'https://mac.macsc.com/mac/92.html?id=MzI1OTY2',
      logo: '/static/icon/macsc.png',
      title: t('MacSC'),
    },
    {
      href: 'https://macflow.net/p/1087.html',
      logo: '/static/icon/macflow.png',
      title: t('MacFlow'),
    },
    {
      href: 'https://xie.infoq.cn/article/bacd52165ed47547509accc1d',
      logo: '/static/icon/infoq.png',
      title: t('InfoQ'),
    },
    {
      href: 'https://www.zhihu.com/question/31031913',
      logo: '/static/icon/zhihu.png',
      title: t('zhihu'),
    },
    {
      href: 'https://sspai.com/post/54035',
      logo: '/static/icon/pi.png',
      title: t('pi'),
    },
  ];
  const [list, setList] = useState(staticList);
  useEffect(() => {
    setList(staticList);
  }, [lang]);

  return (
    <FooterContainer>
      <div className='main'>
        <Image alt='footer' layout='fill' src='/static/image/footerbg.png' />
        <div className='content'>
          <Link passHref href='/'>
            <a>
              <div className='logoWrapper'>
                <Image
                  alt='logo'
                  layout='fill'
                  src={`/static/image/${lang}/headerLogo.png`}
                />
              </div>
            </a>
          </Link>
          <div className='desContent'>
            <div className='left'>
              <div className='list'>
                <div className='item'>
                  <Link passHref href='/introduce'>
                    <a className='link'>{t('gongneng')}</a>
                  </Link>
                </div>
                <div className='item'>
                  <Link passHref href='/about'>
                    <a className='link'>{t('about')}</a>
                  </Link>
                </div>
                {list.map((item) => {
                  return (
                    <div className='item' key={item.title}>
                      <a
                        className='link'
                        href={item.href}
                        rel='noreferrer'
                        target='_blank'
                      >
                        <img alt='logo' height={24} src={item.logo} />
                        <span>{item.title}</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='right'>
              <a
                className='downBtn'
                href={t('downLoadUrl')}
                rel='noreferrer'
                target='_blank'
              >
                {t('download')}
              </a>
            </div>
          </div>
          <div className='comeIn'>
            <div className='title'>
              <div className='hzImg'>
                <Image
                  alt='partner'
                  layout='fill'
                  src='/static/image/hezuo.png'
                />
              </div>
              <div className='text'>{t('swhz')}</div>
            </div>
            <div className='comeList'>
              <div className='item'>{t('phone')}：4000270816（9:00-18:00）</div>
              <div className='item'>{t('email')}：wenhao@gmail.com</div>
              <div className='item'>
                {t('address')}：{t('daddress')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='copyright'>
        Copyright © 2021 - 2023 {t('copyright')} <span>|</span>
        <a href='https://beian.miit.gov.cn/' rel='noreferrer' target='_blank'>
          渝ICP备2023007595号-1-1
        </a>
      </div>
    </FooterContainer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
