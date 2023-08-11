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
      <Html lang='en'>
        <Head>
          <meta content='codeva-wtSOk92344' name='baidu-site-verification' />
          <meta
            content='Dynamic Wallpaper,Live Wallpaper,Wallpaper Engine,Screen Saver,Backgrounds,Irvue'
            name='description'
          />
          <meta
            content='动态壁纸,动态引擎,壁纸引擎,视频壁纸,可视化音乐,Upupoo,Mac屏保,壁纸精灵'
            name='description'
          />
          <meta
            content='Dynamic Wallpaper,Live Wallpaper,Wallpaper Engine,Screen Saver,Backgrounds,Irvue'
            name='keywords'
          />
          <meta
            content='动态壁纸,动态引擎,壁纸引擎,视频壁纸,可视化音乐,Upupoo,Mac屏保,壁纸精灵'
            name='keywords'
          />
          <link href='/favicon.ico' rel='icon' />
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
