import Image from 'next/image';
import {useTranslation} from 'react-i18next';

import type {NextPage} from 'next';

import i18n from '@/locales/config';
import {AboutContainer} from '@/styles/about';
const About: NextPage = () => {
  const lang = i18n.language;
  const {t} = useTranslation();
  return (
    <AboutContainer>
      <div className='cover'>
        <Image
          alt='cover'
          blurDataURL='/static/image/blur.png'
          layout='fill'
          placeholder='blur'
          src='/static/image/aboutus.png'
        />
        <div className='about'>
          <p>ABOUT US</p>
        </div>
      </div>
      <div className='introduce'>
        <div className='title'>{t('gsjj')}</div>
        <div className='item'>{t('about1')}</div>
        <div className='item'>{t('about2')}</div>
        <div className='item'>{t('about3')}</div>
      </div>
    </AboutContainer>
  );
};

About.displayName = 'About';

export default About;
