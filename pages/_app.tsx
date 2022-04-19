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
        <CustomCursor />

        {/* {!loader && ( */}
        <>
          <Header />
          <Component {...pageProps} />
        </>
        {/* )} */}
      </>
    </CursorManager>
  );
}

export default MyApp;
