import React from 'react';
import { motion, Variants } from 'framer-motion';

import styles from './index.module.scss';

type Props = {
  text: string;
};

const variants: Variants = {
  initial: {
    y: '100%'
  },
  animate: delay => ({
    y: 0,
    transition: { delay: delay * 0.1, duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] }
  })
};

export default function AnimatedTitle({ text }: Props) {
  const chars = text.split('');

  return (
    <div className="overflow flex">
      {chars.map((char, index) => (
        <motion.div
          key={index}
          custom={index}
          className={styles.title}
          variants={variants}
          initial={'initial'}
          animate={'animate'}
        >
          {char}
        </motion.div>
      ))}
    </div>
  );
}
