import React, { useEffect, useRef, useState } from 'react';
import { useSplitText } from '../../hooks/useSplitText';

type Props = {
  paragraph: string;
};
export default function AnimatedParagraph({ paragraph }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useSplitText(ref, 'lines');

  return (
    <p ref={ref} id="headline" className={'full-paragraph roadmap-title'}>
      {paragraph}
      {/* I’m a moldavian creative front end developer, I create interfaces, help with art direction, and appreciate polished
	motion design pieces. I also bake in free time. */}
    </p>
  );
}
