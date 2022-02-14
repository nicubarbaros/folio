import type { NextPage } from 'next'
import Head from 'next/head'
import Image from "next/image";
import { useEffect } from "react";
import randomColor from "randomcolor";
import { ArrowDown } from "react-feather";
import HomeCover from "../components/HomeCover";
import CustomCursor from "../components/CustomCursor";
import CursorManager from "../components/CustomCursor/CursorManager";
import ScrollIndicator from "../components/CustomCursor/ScrollIndicator";

const Home: NextPage = () => {
  const year = new Date().getFullYear();

  useEffect(() => {
    // const color = randomColor({
    //   luminosity: "dark",
    //   format: "rgba",
    //   alpha: 0.5, // e.g. 'rgba(9, 1, 107, 0.5)',
    // });
    // document.body.style.backgroundColor = color;
  }, []);
  return (
    <CursorManager>
      <>
        <CustomCursor />

        <div className="home">
          <HomeCover />
          <ScrollIndicator />
          {/* <p className="copyright">©{year} Nicu Barbaros</p> */}
          {/* <p className="copyright">
          <ArrowDown width={100} height={100} />
        </p> */}
        </div>
      </>
    </CursorManager>
  );
};

export default Home
