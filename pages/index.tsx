import type { NextPage } from 'next'
import Head from 'next/head'
import Image from "next/image";
import { useEffect } from "react";
import randomColor from "randomcolor";

const Home: NextPage = () => {
  const year = new Date().getFullYear();

  useEffect(() => {
    const color = randomColor({
      luminosity: "dark",
      format: "rgba",
      alpha: 0.5, // e.g. 'rgba(9, 1, 107, 0.5)',
    });
    document.body.style.backgroundColor = color;
  }, []);
  return (
    <div>
      <Head>
        <title>Nicu Barbaros</title>
        <meta name="description" content="Nicu Barbaros folio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home">
        <h1 className="big-bold-font">Creative developer</h1>
        {/* <h1 className="big-bold-font">I'm Nicu</h1> */}

        <div className="image">
          {/* <img src={"/images/profile.jpeg"} /> */}
          <Image src={"/images/home.jpeg"} objectFit="cover" layout="fill" />
          <Image src={"/images/home.jpeg"} objectFit="cover" layout="fill" />
          <Image src={"/images/home.jpeg"} objectFit="cover" layout="fill" />
        </div>
        <p className="copyright">©{year} Nicu Barbaros</p>
      </div>
    </div>
  );
};

export default Home
