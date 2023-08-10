import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {FooterContainer} from './styles';

import type {NextPage} from 'next';

import i18n from '@/locales/config';
import {SvgIcon} from '@/uikit';

const Footer: NextPage = () => {
  const lang = i18n.language;
  const {t} = useTranslation();
  const staticList = [
    {
      href: 'https://www.jianshu.com/p/1190d89f93fc',
      logo: '/static/icon/jianshu.png',
      title: t('简书'),
    },
    {
      href: 'https://www.zhihu.com/question/55200110',
      logo: '/static/icon/zhihu.png',
      title: t('知乎'),
    },
    {
      href: 'https://www.reddit.com/r/MacOS/comments/njyoql/dynamic_wallpaper_on_mac',
      logo: '/static/icon/reddit.png',
      title: t('Reddit'),
    },
    {
      href: 'https://www.bilibili.com/read/cv17270325',
      logo: '/static/icon/bilibili.png',
      title: t('Bilibili'),
    },
    {
      href: 'https://sspai.com/post/54035',
      logo: '/static/icon/pi.png',
      title: t('pi'),
    },
    {
      href: 'https://www.google.com.hk/search?q=mac%E5%8A%A8%E6%80%81%E5%A3%81%E7%BA%B8&newwindow=1&ei=MnjQZOy9N5ibptQP4vCo6A8&start=0&sa=N&ved=2ahUKEwjsntvw38mAAxWYjYkEHWI4Cv04FBDy0wN6BAgEEAQ&biw=1920&bih=929&dpr=1#fpstate=ive&vld=cid:e066cdf9,vid:ztww0W6Z3A8',
      logo: '/static/icon/ytb.png',
      title: t('YouTube'),
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
                  src='/static/image/zh/headerLogo.png'
                />
              </div>
            </a>
          </Link>
          <div className='desContent'>
            <div className='left'>
              <div className='list'>
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
              </div>
            </div>
            <div className='right'>
              <a
                className='downBtn'
                href={t('downLoadUrl')}
                rel='noreferrer'
                target='_blank'
              >
                <SvgIcon height={50} name={`${lang}blackdown`} />
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
              <div className='item'>{t('email')}：wen646729740@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
      <div className='copyright'>Copyright © 2021 - 2023 {t('copyright')}</div>
    </FooterContainer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
