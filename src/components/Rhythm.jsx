import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const Rhythm = () => {
  const rhythmData = useStore(state => state.content.rhythm);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="rhythm" className="section bg-cream">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>조이킨더의 리듬</h2>
          <p>Daily Rhythm & Breath</p>
        </motion.div>
        
        <motion.div 
          className="rhythm-display"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {rhythmData && rhythmData.map((item, index) => (
            <motion.div key={index} className="rhythm-item" variants={itemVariants}>
              <span className="time">{item.time}</span>
              <div className="content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Rhythm;
