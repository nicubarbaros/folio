import '../styles/root.scss';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import CursorManager from '../components/CustomCursor/CursorManager';
import CustomCursor from '../components/CustomCursor';
import HomeLoader from '../components/HomeLoader';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [loader, setLoader] = useState(true);

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
