import React, { useRef } from 'react';

import styles from './index.module.scss';
import { useSplitText } from '../../hooks/useSplitText';

type Props = {
  text: string;
};

export default function AnimatedTitle({ text }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useSplitText(ref, 'chars', { duration: 0.75, stagger: 0.1, ease: 'power4.out', delay: 0.5 });

  return (
    <div className={styles.title} ref={ref}>
      {text}
    </div>
  );
}
