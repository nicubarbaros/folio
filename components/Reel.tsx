import React, { useEffect, useState } from "react";

type Props = {
  src: string;
};
export default function Reel({ src }: Props) {
  const [stateSrc, setStateSrc] = useState(src);
  const [fade, setFade] = useState("fade-out");

  useEffect(() => {
    setFade("fade-out");

    setTimeout(() => {
      setStateSrc(src);
    }, 500);
    setTimeout(() => {
      setFade("fade-in");
    }, 1000);
  }, [src]);

  useEffect(() => {
    setTimeout(() => {
      setFade("fade-in");
    }, 1000);
  }, []);

  return (
    <div className="reel-container">
      <iframe
        title={src}
        className={`resp-iframe fade ${fade}`}
        src={'https://player.vimeo.com/video/477735526?autoplay=1&loop=1&autopause=0'}
        width="640"
        height="360"
        // frameborder="0"
        // webkitallowfullscreen
        // autoPlay="1"
        // mozallowfullscreen
        // allowfullscreen
        allow="autoplay; fullscreen; picture-in-picture"
        // controls="0"
      ></iframe>
    </div>
  );
}
