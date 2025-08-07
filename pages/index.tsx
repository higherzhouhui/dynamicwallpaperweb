import {LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
import {Avatar, CollapseProps, List, Space} from 'antd';
import Image from 'next/image';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import CountUp from 'react-countup';
import {useTranslation} from 'react-i18next';

import type {NextPage} from 'next';

import i18n from '@/locales/config';
import {clickDownRequest} from '@/services/common';
import {HomeContainer} from '@/styles/home';
import {SvgIcon} from '@/uikit';

const Home: NextPage = () => {
  const {t} = useTranslation();
  const lang = i18n.language;
  const [showAll, setShowAll] = useState(false);
  const formatter = (value: any) => <CountUp end={value} separator=',' />;
  const router = useRouter();
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: t('scff'),
      children: (
        <ul className='myList'>
          <li>{t('feature1')}</li>
          <li>{t('feature2')}</li>
          <li>{t('feature8')}</li>
        </ul>
      ),
    },
    {
      key: '2',
      label: t('czbj'),
      children: (
        <ul className='myList'>
          <li>{t('feature3')}</li>
          <li>{t('feature4')}</li>
          <li>{t('feature5')}</li>
          <li>{t('feature6')}</li>
          <li>{t('feature11')}</li>
          <li>{t('feature16')}</li>
        </ul>
      ),
    },
    {
      key: '3',
      label: t('shndjk'),
      children: (
        <ul className='myList'>
          <li>{t('feature7')}</li>
          <li>{t('feature9')}</li>
          <li>{t('feature10')}</li>
          <li>{t('feature12')}</li>
        </ul>
      ),
    },
    {
      key: '4',
      label: t('wecff'),
      children: (
        <ul className='myList'>
          <li>{t('feature15')}</li>
          <li>{t('feature17')}</li>
        </ul>
      ),
    },
  ];

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

  const [gnList, setGnList] = useState(staticList);
  const dataLength = 9;
  const data = Array.from({length: dataLength}).map((_, i) => ({
    href: '/',
    title: t(`user${i + 1}`),
    avatar: `/static/image/avatar-icon${Math.min(9, i + 1)}.png`,
    description: t(`userDesc${i + 1}`),
    content: t(`comment${i + 1}`),
    start: (dataLength - i) * 403 - i * 72,
    good: (dataLength - i) * 231 - i * 33,
    comment: Math.max((dataLength - i) * 12 - i * 4, i),
    extraImg: `/static/image/comment${Math.min(9, i + 1)}.png`,
  }));

  // eslint-disable-next-line react/no-unstable-nested-components
  const IconText = ({icon, text}: {icon: any; text: any}) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const handleTongji = () => {
    clickDownRequest({id: sessionStorage.getItem('id') || undefined});
  };

  const handleClickImg = () => {};

  useEffect(() => {
    setGnList(staticList);
  }, [lang]);

  return (
    <HomeContainer>
      <div className='cover'>
        <Image
          alt='cover'
          blurDataURL='/static/image/blur.png'
          layout='fill'
          placeholder='blur'
          src={`/static/image/${lang}/cover.png`}
        />
        <div className='downWrapper'>
          <div className='title'>{t('downTitle')}</div>
          {/* <div className='slogo'>
            <div className='color1'>{t('gbdd')}</div>
            <div className='color2'>{t('ybhp')}</div>
          </div> */}
          <a
            href={t('downLoadUrl')}
            rel='noreferrer'
            target='_blank'
            onClick={() => {
              handleTongji();
            }}
          >
            <SvgIcon
              className='svgIcon'
              height={50}
              name={`${lang}blackdown`}
            />
          </a>
        </div>
      </div>
      <div className='mainContent'>
        <div className='introduce'>
          <div className='title'>{t('productIntroduce')}</div>
          <div className='produceDesc'>{t('productDesc')}</div>
          <div className='subTitle'>{t('feature')}</div>
          <div className='listWrapper'>
            {[...Array(17)].map((_, index) => {
              return (
                <li className='listItem' key={index}>
                  {t(`feature${index + 1}`)}
                </li>
              );
            })}
          </div>

          {/* <Collapse defaultActiveKey={['1']} items={items} /> */}
        </div>
        <div className='gongneng'>
          <div className='title'>{t('gongneng')}</div>
          <div className='content'>
            {gnList.map((item, index) => {
              return index < (showAll ? 10 : 4) ? (
                <div className='item' key={index}>
                  <div className='imgWrapper'>
                    <Image
                      alt='gongneng'
                      blurDataURL='/static/image/blur.png'
                      layout='fill'
                      placeholder='blur'
                      src={item.src}
                      onClick={() => {
                        handleClickImg();
                      }}
                    />
                  </div>
                  <div className='desc'>{item.content}</div>
                </div>
              ) : null;
            })}
          </div>
          <div
            className={`lookMore ${showAll ? '' : 'notAll'}`}
            onClick={() => {
              setShowAll(!showAll);
            }}
          >
            {showAll ? t('shouqi') : t('discover')}
            <div className='imgWrapper'>
              <Image alt='more' layout='fill' src='/static/image/more.png' />
            </div>
          </div>
        </div>
        <div className='user'>
          {lang === 'zh' ? (
            <div className='title Statistic'>
              深受超过 3,784,575 位用户的信赖
            </div>
          ) : (
            <div className='title Statistic'>
              Deeply surpassed 3,784,575 Trusted by users
            </div>
          )}

          <div className='comments'>
            <List
              dataSource={data}
              footer={
                <div>
                  <b>Mac App Store</b> support origin data
                </div>
              }
              itemLayout='vertical'
              pagination={{
                position: 'top',
                align: 'end',
                pageSize: 3,
              }}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <IconText
                      icon={StarOutlined}
                      key='list-vertical-star-o'
                      text={item.start}
                    />,
                    <IconText
                      icon={LikeOutlined}
                      key='list-vertical-like-o'
                      text={item.good}
                    />,
                    <IconText
                      icon={MessageOutlined}
                      key='list-vertical-message'
                      text={item.comment}
                    />,
                  ]}
                  extra={
                    <a
                      className='extraImg'
                      href={t('downLoadUrl')}
                      rel='noreferrer'
                      target='_blank'
                      onClick={() => {
                        handleTongji();
                      }}
                    >
                      <div className='imgWrapper'>
                        <Image
                          alt='gongneng'
                          blurDataURL='/static/image/blur.png'
                          layout='fill'
                          placeholder='blur'
                          src={item.extraImg}
                        />
                      </div>
                    </a>
                  }
                  key={item.title}
                >
                  <List.Item.Meta
                    avatar={<Avatar size='large' src={item.avatar} />}
                    description={item.description}
                    title={<span>{item.title}</span>}
                  />
                  <span style={{color: '#333', fontSize: '13px'}}>
                    {item.content}
                  </span>
                </List.Item>
              )}
              size='large'
            />
          </div>
        </div>
        <div className='video'>
          <div className='title'>{t('tiyan')}</div>
          <video controls preload='auto'>
            <source src='/static/video/xc.mp4' type='video/mp4' />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
      {/* <Swiper
        className='mySwiper'
        loop={false}
     
        onSwiper={setSwiper}
      >
        {tabs.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <SwipperItem>
               
              </SwipperItem>
            </SwiperSlide>
          );
        })}
      </Swiper> */}
    </HomeContainer>
  );
};

Home.displayName = 'Home';

export default Home;
