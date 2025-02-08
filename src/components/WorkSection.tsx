import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution built with React",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    link: "https://example.com/project1"
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Responsive portfolio website with animations",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80",
    link: "https://example.com/project2"
  },
  {
    id: 3,
    title: "Mobile App",
    description: "Cross-platform mobile application",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80",
    link: "https://example.com/project3"
  },
  {
    id: 4,
    title: "Web Application",
    description: "Full-stack web application with real-time features",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    link: "https://example.com/project4"
  }
];

const WorkSection: React.FC = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const innerCarousel = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const updateWidth = () => {
      if (carousel.current && innerCarousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const autoScroll = async () => {
      if (isDragging || isHovered || isMobile) return; // Disable auto-scroll on mobile
      
      await controls.start({
        x: [-width, 0],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity
        }
      });
    };

    autoScroll();
  }, [controls, width, isDragging, isHovered, isMobile]);

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (!isHovered && !isMobile) {
      controls.start({
        x: [-width, 0],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity
        }
      });
    }
  };

  return (
    <section id="work" className="py-32 overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Latest Work
        </motion.h2>
      </div>

      <motion.div 
        ref={carousel}
        className="cursor-grab active:cursor-grabbing touch-pan-x"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        <motion.div
          ref={innerCarousel}
          className="flex gap-4 md:gap-8 px-4 md:px-[10vw]"
          animate={controls}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          dragMomentum={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{
            touchAction: "pan-x"
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative w-[280px] md:w-[600px] flex-shrink-0"
              whileHover={{ scale: isMobile ? 1 : 0.95 }}
            >
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="relative h-[200px] md:h-[400px] rounded-2xl overflow-hidden group">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: isMobile ? 1 : 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 md:p-6"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-center text-sm md:text-base text-gray-200 mb-4">{project.description}</p>
                    <span className="px-3 py-1 md:px-4 md:py-2 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                      View Project
                    </span>
                  </motion.div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WorkSection;