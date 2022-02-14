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
import Link from 'next/link';

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
        </div>
        <section className="section about-image">
          <div className="image">
            <Image src={'/images/home2.jpeg'} objectFit="cover" layout="fill" />
            {/* <Image src={"/images/profile.jpeg"} objectFit="cover" layout="f	ill" /> */}
            {/* <Image src={"/images/home2.jpeg"} objectFit="cover" layout="fill" /> */}
          </div>
        </section>
        <section className="section about-text">
          <p className="full-paragraph">
            {/* I’m a moldavian creative front end developer, I create interfaces, help with art direction, and appreciate polished
          motion design pieces. I also bake in free time. */}
            I’m a moldavian Front End developer, content creator on YouTube, help with Creative Front End development
            growth, and appreciate polished web design pieces. I also bake in free time.
          </p>
        </section>

        <footer className="footer">
          <h6>Nicu Barbaros</h6>

          <div>
            <Link href="https://twitter.com/nicubarbaros" passHref>
              <a target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </Link>
            <Link href="https://twitter.com/nicubarbaros" passHref>
              <a target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </Link>
          </div>

          <h6>({year}), all rights reserved</h6>
        </footer>
      </>
    </CursorManager>
  );
};

export default Home
