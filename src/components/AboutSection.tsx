import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-32">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Us
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl">
              We specialize in delivering innovative and cutting-edge digital solutions. Our expert team of developers, designers, and strategists work together to create dynamic web applications, websites, and mobile apps that meet the unique needs of businesses and individuals.
            </p>
            <p className="text-lg md:text-xl">
              With a passion for technology and a commitment to excellence, we aim to drive growth and efficiency for our clients through seamless, user-friendly, and scalable solutions. Whether you're looking to build a custom web platform, a mobile app, or improve your online presence, we are here to turn your vision into reality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl">
              Our approach is rooted in professionalism, attention to detail, and a relentless pursuit of high-quality results. We're dedicated to ensuring that every project we take on not only meets but exceeds expectations.
            </p>
            <div className={`p-8 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white`}>
              <h3 className="text-2xl font-bold mb-4">Let's create something amazing together!</h3>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;