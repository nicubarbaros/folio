import Image from "next/image";
import React from "react";
import AnimatedTitle from './AnimatedTitle';
import Reel from './Reel';

export default function HomeCover() {
  return (
    <div className="home-cover">
      <AnimatedTitle text="Creative" />
      <AnimatedTitle text="Developer" />

      {/* <Reel src={"https://player.vimeo.com/video/477735526?background=1"} /> */}
    </div>
  );
}
