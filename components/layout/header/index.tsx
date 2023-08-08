import {Dropdown, MenuProps} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {HeaderContainer, LangShowCompent} from './styles';

import type {NextPage} from 'next';

import i18n from '@/locales/config';

const Header: NextPage = () => {
  const {t} = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const router = useRouter();

  const staticTitles = [
    {title: t('shouye'), key: '/'},
    {title: t('gongneng'), key: '/introduce'},
    {title: t('about'), key: '/about'},
  ];
  const [titles, setTitles] = useState(staticTitles);

  const shiftLanguage = (lang: string) => {
    localStorage.setItem('lang', lang);
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    setTitles(staticTitles);
  }, [i18n.language]);

  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: (
        <div
          style={{display: 'flex', alignItems: 'center', padding: '6px 0'}}
          onClick={(e) => {
            shiftLanguage('en');
          }}
        >
          <img
            height={20}
            src='/static/image/en.png'
            style={{marginRight: '5px'}}
            width={26}
          />
          <span style={{color: '15px'}}>English</span>
        </div>
      ),
      disabled: currentLang === 'en',
    },
    {
      key: 'zh',
      label: (
        <div
          style={{display: 'flex', alignItems: 'center', padding: '6px 0'}}
          onClick={(e) => {
            shiftLanguage('zh');
          }}
        >
          <img
            height={20}
            src='/static/image/zh.png'
            style={{marginRight: '5px'}}
            width={26}
          />
          <span style={{color: '15px'}}>简体中文</span>
        </div>
      ),
      disabled: currentLang === 'zh',
    },
  ];

  return (
    <HeaderContainer>
      <div className='content'>
        <div className='left'>
          <Link passHref href='/'>
            <a>
              <div className='logoWrapper'>
                <Image
                  alt='logo'
                  layout='fill'
                  src={`/static/image/${currentLang}/headerLogo.png`}
                />
              </div>
            </a>
          </Link>
          <div className='titles'>
            {titles.map((item) => {
              return (
                <Link passHref href={item.key} key={item.key}>
                  <a
                    className={`title ${
                      router.pathname === item.key ? 'active' : ''
                    }`}
                  >
                    {item.title}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
        <div className='right'>
          <Dropdown menu={{items}} placement='bottom' trigger={['hover']}>
            <LangShowCompent>
              <div className='imgWrapper'>
                <Image
                  alt='lang'
                  layout='fill'
                  src={`/static/image/${currentLang}.png`}
                />
              </div>
              <div className='lang'>
                {currentLang === 'zh' ? '简体中文' : 'English'}
              </div>
            </LangShowCompent>
          </Dropdown>
        </div>
      </div>
    </HeaderContainer>
  );
};

Header.displayName = 'Header';

export default Header;
