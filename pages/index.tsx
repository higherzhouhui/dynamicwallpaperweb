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
import {SEO} from '@/components';

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
    clickDownRequest();
  };

  const handleClickImg = () => {};

  return (
    <>
      <SEO 
        title="首页"
        description="Dynamic Wallpaper - 专业的动态壁纸引擎，支持视频壁纸、音乐可视化、屏幕保护等功能。让您的桌面更加生动有趣。"
        keywords="动态壁纸,动态引擎,壁纸引擎,视频壁纸,可视化音乐,Upupoo,Mac屏保,壁纸精灵,桌面美化"
        canonical="https://your-domain.com/"
      />
      <HomeContainer>
        <div className='header'>
          <div className='title'>
            <h1>{t('title')}</h1>
            <p>{t('subtitle')}</p>
          </div>
          <div className='download'>
            <button onClick={handleTongji}>
              <SvgIcon name='download' />
              {t('download')}
            </button>
          </div>
        </div>

        <div className='stats'>
          <div className='stat-item'>
            <div className='number'>{formatter(1000000)}</div>
            <div className='label'>{t('downloads')}</div>
          </div>
          <div className='stat-item'>
            <div className='number'>{formatter(500000)}</div>
            <div className='label'>{t('users')}</div>
          </div>
          <div className='stat-item'>
            <div className='number'>{formatter(10000)}</div>
            <div className='label'>{t('wallpapers')}</div>
          </div>
        </div>

        <div className='features'>
          <h2>{t('features')}</h2>
          <div className='feature-grid'>
            {items.map((item) => (
              <div key={item.key} className='feature-item'>
                <h3>{item.label}</h3>
                {item.children}
              </div>
            ))}
          </div>
        </div>

        <div className='gallery'>
          <h2>{t('gallery')}</h2>
          <div className='gallery-grid'>
            {gnList.slice(0, showAll ? gnList.length : 6).map((item, index) => (
              <div key={index} className='gallery-item'>
                <Image
                  src={item.src}
                  alt={item.content}
                  width={300}
                  height={200}
                  layout='responsive'
                />
                <p>{item.content}</p>
              </div>
            ))}
          </div>
          {!showAll && (
            <button onClick={() => setShowAll(true)} className='show-more'>
              {t('showMore')}
            </button>
          )}
        </div>

        <div className='reviews'>
          <h2>{t('reviews')}</h2>
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

        <div className='video'>
          <div className='title'>{t('tiyan')}</div>
          <video controls preload='auto'>
            <source src='/static/video/xc.mp4' type='video/mp4' />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </HomeContainer>
    </>
  );
};

Home.displayName = 'Home';

export default Home;
