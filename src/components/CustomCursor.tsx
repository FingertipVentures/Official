import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

export const CustomCursor = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Only enable custom cursor on desktop
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      x.set(mouseX - 8);
      y.set(mouseY - 8);
      setPosition({ x: mouseX, y: mouseY });

      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
      
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setIsOverHero(
          mouseY >= rect.top &&
          mouseY <= rect.bottom &&
          mouseX >= rect.left &&
          mouseX <= rect.right
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, isMobile]);

  // Don't render custom cursor on mobile
  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{
        x,
        y,
        scale: isPointer ? 1.5 : 1,
      }}
      transition={{
        scale: {
          type: "spring",
          stiffness: 150,
          damping: 15,
        },
      }}
    >
      <div
        className={`w-4 h-4 rounded-full ${
          isOverHero || isDarkMode ? 'bg-white mix-blend-difference' : 'bg-black mix-blend-difference'
        }`}
      />
    </motion.div>
  );
};