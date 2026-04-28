import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import defaultHeroImg from '../assets/images/hero_bg.png';

const Hero = () => {
  const { content } = useStore();

  return (
    <section id="hero">
      <div className="hero-content container">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ whiteSpace: 'pre-line' }}
        >
          {content.heroTitle}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {content.heroSubtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#philosophy" className="btn btn-primary">둘러보기</a>
        </motion.div>
      </div>
      <div className="hero-bg">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src={defaultHeroImg} 
          alt="숲속에서 자연과 함께 활동하는 아이들의 평화로운 모습" 
          className="hero-img-bg" 
          loading="eager" 
        />
      </div>
    </section>
  );
};

export default Hero;
