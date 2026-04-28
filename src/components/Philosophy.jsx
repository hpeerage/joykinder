import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const Philosophy = () => {
  const philosophyData = useStore(state => state.content.philosophy);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="philosophy" className="section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <h2>교육 철학</h2>
          <p>Waldorf Forest Education</p>
        </motion.div>
        
        <motion.div 
          className="grid cards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {philosophyData && philosophyData.map((item, index) => (
            <motion.div key={index} className="card" variants={itemVariants}>
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
