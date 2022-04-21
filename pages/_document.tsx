import { Html, Head, Main, NextScript } from 'next/document';
import * as gtag from '../utils/gtag';
export default function Document() {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <Html>
      <Head>
        {/* We only want to add the scripts if in production */}
        {isProduction && (
          <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtag.GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
