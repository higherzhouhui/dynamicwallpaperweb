/* eslint-disable react/jsx-sort-props */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang='zh-CN'>
        <Head>
          {/* 基础Meta标签 */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          
          {/* SEO Meta标签 */}
          <meta name="description" content="专业的动态壁纸引擎，支持视频壁纸、音乐可视化、屏幕保护等功能。提供高质量的动态背景，让您的桌面更加生动有趣。" />
          <meta name="keywords" content="动态壁纸,动态引擎,壁纸引擎,视频壁纸,可视化音乐,Upupoo,Mac屏保,壁纸精灵,Dynamic Wallpaper,Live Wallpaper,Wallpaper Engine,Screen Saver,Backgrounds" />
          <meta name="author" content="Dynamic Wallpaper Team" />
          <meta name="robots" content="index, follow" />
          
          {/* Open Graph Meta标签 */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Dynamic Wallpaper - 动态壁纸引擎" />
          <meta property="og:description" content="专业的动态壁纸引擎，支持视频壁纸、音乐可视化、屏幕保护等功能" />
          <meta property="og:image" content="/static/image/logo.png" />
          <meta property="og:url" content="https://your-domain.com" />
          <meta property="og:site_name" content="Dynamic Wallpaper" />
          <meta property="og:locale" content="zh_CN" />
          
          {/* Twitter Card Meta标签 */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Dynamic Wallpaper - 动态壁纸引擎" />
          <meta name="twitter:description" content="专业的动态壁纸引擎，支持视频壁纸、音乐可视化、屏幕保护等功能" />
          <meta name="twitter:image" content="/static/image/logo.png" />
          
          {/* 其他重要Meta标签 */}
          <meta name="theme-color" content="#1890ff" />
          <meta name="msapplication-TileColor" content="#1890ff" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Dynamic Wallpaper" />
          
          {/* 图标 */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/static/image/logo.png" />
          <link rel="manifest" href="/manifest.json" />
          
          {/* 预连接优化 */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* DNS预解析 */}
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
