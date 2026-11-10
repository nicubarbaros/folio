import { Html, Head, Main, NextScript } from 'next/document';
import * as gtag from '../utils/gtag';
export default function Document() {
  const isProduction = process.env.NODE_ENV === 'production';
  const measurementId = gtag.GA_TRACKING_ID;

  return (
    <Html>
      <Head>
        {/* The tag is production-only. The id is public, and the client route tracker reads it from the window. */}
        {isProduction && measurementId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    window.__GA_TRACKING_ID = ${JSON.stringify(measurementId)};
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', window.__GA_TRACKING_ID, {
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
