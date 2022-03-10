import React from 'react';
import { motion, Variants } from 'framer-motion';

const variants: Variants = {
  initial: {
    y: -100,
    opacity: 0
  },

  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.6 }
  }
};
export default function Header() {
  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        <motion.h6 variants={variants} initial="initial" animate="animate">
          nicu barbaros
        </motion.h6>
        <motion.h6 variants={variants} initial="initial" animate="animate">
          Currently Senior <br /> Software Engineer at Planable
        </motion.h6>
        <motion.h6 variants={variants} initial="initial" animate="animate">
          Based in <br /> Chisinau Moldova
        </motion.h6>
      </div>
      <motion.h6 className="nav-bar-right" variants={variants} initial="initial" animate="animate">
        menu
      </motion.h6>
    </div>
  );
}
