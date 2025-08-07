import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Dynamic Wallpaper - 动态壁纸引擎',
  description = '专业的动态壁纸引擎，支持视频壁纸、音乐可视化、屏幕保护等功能。提供高质量的动态背景，让您的桌面更加生动有趣。',
  keywords = '动态壁纸,动态引擎,壁纸引擎,视频壁纸,可视化音乐,Upupoo,Mac屏保,壁纸精灵',
  image = '/static/image/logo.png',
  url = 'https://your-domain.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Dynamic Wallpaper Team',
  section,
  tags = [],
  noindex = false,
  nofollow = false,
  canonical,
}) => {
  const fullTitle = title === 'Dynamic Wallpaper - 动态壁纸引擎' ? title : `${title} - Dynamic Wallpaper`;
  const fullUrl = canonical || url;
  const robots = `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`;

  return (
    <Head>
      {/* 基础Meta标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      
      {/* 规范链接 */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta标签 */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Dynamic Wallpaper" />
      <meta property="og:locale" content="zh_CN" />
      
      {/* Twitter Card Meta标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* 文章特定Meta标签 */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === 'article' ? 'Article' : 'WebSite',
            "name": fullTitle,
            "description": description,
            "url": fullUrl,
            "image": image,
            "publisher": {
              "@type": "Organization",
              "name": "Dynamic Wallpaper",
              "logo": {
                "@type": "ImageObject",
                "url": "/static/image/logo.png"
              }
            },
            ...(type === 'article' && {
              "author": {
                "@type": "Person",
                "name": author
              },
              "datePublished": publishedTime,
              "dateModified": modifiedTime,
              "articleSection": section,
              "keywords": keywords
            })
          })
        }}
      />
    </Head>
  );
};

export default SEO; 