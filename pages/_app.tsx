import '../styles/root.scss';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import CursorManager from '../components/CustomCursor/CursorManager';
import CustomCursor from '../components/CustomCursor';
import HomeLoader from '../components/HomeLoader';
import { useState } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const [loader, setLoader] = useState(true);
  const router = useRouter();

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
          {/* the home and okie designs are single column with no nav, the fixed bar overlaps their intro */}
          {pathname !== '/' && pathname !== '/okie' && <Header />}
          <Component {...pageProps} />
        </>
        {/* )} */}
      </>
    </CursorManager>
  );
}

export default MyApp;
