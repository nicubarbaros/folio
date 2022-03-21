import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowDown } from 'react-feather';
import HomeCover from '../components/HomeCover';
import CustomCursor from '../components/CustomCursor';
import CursorManager from '../components/CustomCursor/CursorManager';
import ScrollIndicator from '../components/ScrollIndicator';
import Link from 'next/link';
import HomeLoader from '../components/HomeLoader';
import Footer from '../components/Footer';
import AnimatedParagraph from '../components/AnimatedParagraph';

const Home: NextPage = () => {
  return (
    <>
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
        <AnimatedParagraph />
      </section>

      <section className="section">
        <h1>Projects</h1>

        <p>Placeholder for some sort of webgl based images/sliders/grid</p>
      </section>

      <Footer />
    </>
  );
};

export default Home;
