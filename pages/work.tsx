import React, { useEffect } from 'react';
import Image from 'next/image';
import pic1 from '../public/images/work/1.jpg';
import pic2 from '../public/images/work/2.png';
import pic3 from '../public/images/work/3.png';
import pic4 from '../public/images/work/4.png';
import pic5 from '../public/images/work/5.png';
import pic6 from '../public/images/work/6.png';
import pic7 from '../public/images/work/7.png';
import pic8 from '../public/images/work/8.png';
import pic9 from '../public/images/work/9.png';
import pic10 from '../public/images/work/10.png';
import pic11 from '../public/images/work/11.png';
import pic12 from '../public/images/work/12.png';
import pic13 from '../public/images/work/13.png';
import pic14 from '../public/images/work/14.png';

import cn from 'classnames';
import HomeLoader from '../components/HomeLoader';
const profilePic = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14];

export default function Work() {
  const [loader, setLoader] = React.useState(true);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const intervalRef = React.useRef<NodeJS.Timer>();
  const [isPaused, setIsPaused] = React.useState(false);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % profilePic.length);
    }, 400);

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  const handleOnMouseDown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);

      setIsPaused(true);
    }
  };

  const handleOnMouseUp = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % profilePic.length);
    }, 400);
    setIsPaused(false);
  };

  return (
    <>
      <HomeLoader setLoader={setLoader} title="work" />

      <div
        className={cn('work-slider-container', { 'is-paused': isPaused })}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
      >
        {profilePic.map((pic, index) => (
          <Image
            key={index}
            src={pic}
            alt="Picture of the author"
            layout="fill"
            className={cn('work-slider-item', { active: activeIndex === index })}
          />
        ))}
      </div>
    </>
  );
}
