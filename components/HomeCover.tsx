import Image from "next/image";
import React from "react";
import AnimatedTitle from './AnimatedTitle';
import Reel from './Reel';

export default function HomeCover() {
  return (
    <div className="home-cover">
      {/* <h1 className="big-bold-font">Nicu Barbaros</h1> */}

      {/* <div className="image">
        <Image src={'/images/home.jpeg'} objectFit="cover" layout="fill" /> */}
      {/* <Image src={"/images/profile.jpeg"} objectFit="cover" layout="f	ill" /> */}
      {/* <Image src={"/images/home2.jpeg"} objectFit="cover" layout="fill" /> */}
      {/* </div> */}
      <AnimatedTitle text="Creative" />
      <AnimatedTitle text="Developer" />
      {/* <h1 className="big-bold-font">I'm Nicu</h1> */}

      {/* <Reel src={"https://player.vimeo.com/video/477735526?background=1"} /> */}
    </div>
  );
}
