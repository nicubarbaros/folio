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
  console.log(router);

  const { pathname } = router;
  console.log(pathname);
  if (pathname === '/roadmap') {
    return <Component {...pageProps} />;
  }
  return (
    <CursorManager>
      <>
        <HomeLoader setLoader={setLoader} />
        <CustomCursor />

        {!loader && (
          <>
            <Header />
            <Component {...pageProps} />
          </>
        )}
      </>
    </CursorManager>
  );
}

export default MyApp;
