import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import SplitText from '../utils/SplitText.min.js';
import useOnScreen from './useOnScreen';
import gsap from 'gsap';

export function useSplitText(
  element: React.RefObject<HTMLDivElement>,
  type: 'lines' | 'chars' | 'words',
  easeOptions: Pick<GSAPTweenVars, 'duration' | 'stagger' | 'ease' | 'delay'> = {
    duration: 0.75,
    stagger: 0.1,
    ease: 'power4.out'
  }
) {
  const splitLinesRef = useRef(null);
  const [reveal, setReveal] = useState(false);

  const onScreen = useOnScreen(element);

  useEffect(() => {
    if (onScreen) setReveal(onScreen);
  }, [onScreen]);

  useEffect(() => {
    const split = new SplitText(element.current, { type });
    gsap.set(split[type], { y: 100, opacity: 0 });

    splitLinesRef.current = split[type];
  }, [type, element]);

  useEffect(() => {
    if (reveal) {
      gsap.to(splitLinesRef.current, {
        y: 0,
        opacity: 1,
        ...easeOptions
      });
    }
  }, [reveal, easeOptions]);
}
