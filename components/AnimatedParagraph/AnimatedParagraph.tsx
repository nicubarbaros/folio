import React, { useEffect, useRef, useState } from 'react';
import { useSplitText } from '../../hooks/useSplitText';

export default function AnimatedParagraph() {
  const ref = useRef<HTMLDivElement>(null);
  useSplitText(ref, 'lines');

  return (
    <p ref={ref} id="headline" className={'full-paragraph'}>
      {/* I’m a moldavian creative front end developer, I create interfaces, help with art direction, and appreciate polished
	motion design pieces. I also bake in free time. */}
      I’m a moldavian Front End developer, content creator on YouTube, help with Creative Front End development growth,
      and appreciate polished web design pieces. I also bake in free time.
    </p>
  );
}
