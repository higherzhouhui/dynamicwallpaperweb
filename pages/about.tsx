import Image from 'next/image';
import {useTranslation} from 'react-i18next';

import type {NextPage} from 'next';

import i18n from '@/locales/config';
import {AboutContainer} from '@/styles/about';
import {SEO} from '@/components';
const About: NextPage = () => {
  const lang = i18n.language;
  const {t} = useTranslation();
  return (
    <>
      <SEO 
        title="关于我们"
        description="了解Dynamic Wallpaper团队，我们致力于为用户提供最优质的动态壁纸体验。"
        keywords="关于我们,团队介绍,联系方式,动态壁纸团队"
        canonical="https://your-domain.com/about"
      />
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
        <div className='item'>
          {t('about3')}
          <span className='link'>wen646729740@gmail.com</span>
        </div>
      </div>
    </AboutContainer>
    </>
  );
};

About.displayName = 'About';

export default About;
