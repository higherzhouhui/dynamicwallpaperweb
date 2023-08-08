import {useSize} from 'ahooks';
import Image from 'next/image';
import {useState, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Swiper, SwiperSlide} from 'swiper/react';

import type {NextPage} from 'next';

import i18n from '@/locales/config';
import {IntroduceContainer} from '@/styles/introduce';

import 'swiper/css';

const Introduce: NextPage = () => {
  const {t} = useTranslation();
  const lang = i18n.language;
  const [swiper, setSwiper] = useState<any>();
  const [imgHeight, setImgHeight] = useState(320);
  const [imgWidth, setImgWidth] = useState(500);
  const introduceRef = useRef<any>();
  const size = useSize(introduceRef);
  const staticList = [
    {src: `/static/image/${lang}/1.png`, content: t('desc1')},
    {src: `/static/image/${lang}/2.png`, content: t('desc2')},
    {src: `/static/image/${lang}/3.png`, content: t('desc3')},
    {src: `/static/image/${lang}/4.png`, content: t('desc4')},
    {src: `/static/image/${lang}/5.png`, content: t('desc5')},
    {src: `/static/image/${lang}/6.png`, content: t('desc6')},
    {src: `/static/image/${lang}/7.png`, content: t('desc7')},
    {src: `/static/image/${lang}/8.png`, content: t('desc8')},
    {src: `/static/image/${lang}/9.png`, content: t('desc9')},
    {src: `/static/image/${lang}/10.png`, content: t('desc10')},
  ];
  const [list, setList] = useState(staticList);

  useEffect(() => {
    setList(staticList);
  }, [lang]);

  useEffect(() => {
    if (size && size.width && size.height) {
      setImgHeight(size?.width * 0.27);
      setImgWidth((size?.width * 0.27) / 0.64);
    }
  }, [size]);

  return (
    <IntroduceContainer ref={introduceRef}>
      <div className='cover'>
        <div className='imgWrapper'>
          <Image
            alt='banner'
            layout='fill'
            src='/static/image/introduceCover.png'
          />
        </div>
        <div className='swiperWrapper' style={{height: `${imgHeight}px`}}>
          <div className='handle pre' onClick={() => swiper?.slidePrev()}>
            <img alt='pre' src='/static/icon/pre.png' />
          </div>
          <Swiper
            loop
            className='mySwiper'
            style={{width: `${imgWidth}px`}}
            onSwiper={setSwiper}
          >
            {list.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image
                    alt='banner'
                    blurDataURL='/static/image/blur.png'
                    height={imgHeight}
                    layout='fixed'
                    placeholder='blur'
                    src={item.src}
                    width={imgWidth}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className='handle next' onClick={() => swiper?.slideNext()}>
            <img alt='pre' src='/static/icon/next.png' />
          </div>
          <div className='mask' />
        </div>
      </div>

      <div className='content'>
        <div className='title'>{t('light')}</div>
        {[...Array(17)].map((_, index) => {
          return (
            <li className='listItem' key={index}>
              {t(`feature${index + 1}`)}
            </li>
          );
        })}
      </div>
    </IntroduceContainer>
  );
};

Introduce.displayName = 'Introduce';

export default Introduce;
