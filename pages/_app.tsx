import '../styles/root.scss';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import CursorManager from '../components/CustomCursor/CursorManager';
import CustomCursor from '../components/CustomCursor';
import HomeLoader from '../components/HomeLoader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../utils/gtag';

function MyApp({ Component, pageProps }: AppProps) {
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initialUrl = window.location.pathname + window.location.search;
    let handledInitial = false;
    const handleRouteChange = (url: string) => {
      if (!gtag.shouldSendRoutePageView(url, initialUrl, handledInitial)) {
        handledInitial = true;
        return;
      }
      handledInitial = true;
      gtag.pageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const { pathname } = router;
  console.log(pathname);
  if (pathname === '/free-tools') {
    return <Component {...pageProps} />;
  }

  if (pathname === '/roadmap') {
    return (
      <CursorManager>
        <>
          {/* <HomeLoader setLoader={setLoader} title="hey" /> */}
          <CustomCursor />

          {/* {!loader && ( */}
          {/* <> */}
          <Component {...pageProps} />
          {/* </> */}
          {/* )} */}
        </>
      </CursorManager>
    );
  }
  return (
    <CursorManager>
      <>
        {/* <HomeLoader setLoader={setLoader} title="folio" /> */}

        {/* {!loader && ( */}
        <>
          {/* home and /okie pages are a single column; the fixed bar overlaps their intro */}
          {pathname !== '/' && pathname !== '/okie' && !pathname.startsWith('/okie/') && <Header />}
          <Component {...pageProps} />
        </>
        {/* )} */}
      </>
    </CursorManager>
  );
}

export default MyApp;
