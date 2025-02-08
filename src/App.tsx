import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { useMediaQuery } from './hooks/useMediaQuery';

// Lazy load components that are not immediately visible
const Hero3D = lazy(() => import('./components/Hero3D'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const WorkSection = lazy(() => import('./components/WorkSection'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!isDarkMode) {
      document.documentElement.classList.add('light-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      document.documentElement.classList.toggle('light-mode');
      return newMode;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'work', 'contact'];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close mobile menu first
      setIsMobileMenuOpen(false);

      // Add a small delay to ensure the menu is closed before scrolling
      setTimeout(() => {
        const navHeight = 80; // Approximate height of the navigation bar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const navigationLinks = ['home', 'about', 'services', 'work', 'contact'];

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div
          className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
            } cursor-none transition-colors duration-300`}
        >
          <CustomCursor isDarkMode={isDarkMode} />

          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-opacity-50 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <motion.a
                  href="#"
                  className="text-xl md:text-2xl font-bold"
                  whileHover={{ scale: 1.05 }}
                >
                  Fingertip Ventures
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  {navigationLinks.map((section) => (
                    <motion.button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`text-sm font-medium ${activeSection === section ? 'text-purple-500' : ''
                        }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </motion.button>
                  ))}
                  <motion.button
                    className="p-2 rounded-full bg-opacity-20"
                    onClick={toggleDarkMode}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center space-x-4 md:hidden">
                  <motion.button
                    className="p-2 rounded-full bg-opacity-20"
                    onClick={toggleDarkMode}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </motion.button>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2"
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Mobile Navigation Menu */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`md:hidden mt-4 ${isDarkMode
                      ? 'bg-gray-800 text-white'
                      : 'bg-white text-gray-900'
                      } shadow-lg rounded-lg overflow-hidden`}
                  >
                    <div className="flex flex-col">
                      {navigationLinks.map((section) => (
                        <button
                          key={section}
                          onClick={() => scrollToSection(section)}
                          className={`w-full text-left px-6 py-4 text-sm font-medium ${isDarkMode
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-gray-100'
                            } transition-colors ${activeSection === section
                              ? 'text-purple-500'
                              : isDarkMode
                                ? 'text-gray-100'
                                : 'text-gray-900'
                            }`}
                        >
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Hero Section */}
          <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-black"
          >
            <Suspense fallback={<div className="w-full h-full bg-gray-900" />}>
              <Hero3D />
            </Suspense>
            <div className="container mx-auto px-4 text-center relative z-10">
              <motion.h1
                className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-white"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                We Create Digital Magic
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-400"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Transforming ideas into exceptional digital experiences
              </motion.p>
            </div>
          </section>

          {/* About Section */}
          <Suspense fallback={<div>Loading about section...</div>}>
            <AboutSection />
          </Suspense>

          {/* Services Section */}
          <section
            id="services"
            className={`py-32 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
          >
            <div className="container mx-auto px-4">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div
                  className={`p-6 md:p-8 rounded-2xl transition-colors ${isDarkMode
                    ? 'bg-black hover:bg-gray-800'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                    }`}
                >
                  <Code className="w-12 h-12 mb-6" />
                  <h3 className="text-xl md:text-2xl font-bold mb-4">Web Development</h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Custom websites and web applications built with cutting-edge
                    technologies.
                  </p>
                </div>
                <div
                  className={`p-6 md:p-8 rounded-2xl transition-colors ${isDarkMode
                    ? 'bg-black hover:bg-gray-800'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                    }`}
                >
                  <Smartphone className="w-12 h-12 mb-6" />
                  <h3 className="text-xl md:text-2xl font-bold mb-4">Mobile Apps</h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Native and cross-platform mobile applications for iOS and
                    Android.
                  </p>
                </div>
                <div
                  className={`p-6 md:p-8 rounded-2xl transition-colors ${isDarkMode
                    ? 'bg-black hover:bg-gray-800'
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                    }`}
                >
                  <Globe className="w-12 h-12 mb-6" />
                  <h3 className="text-xl md:text-2xl font-bold mb-4">Digital Solutions</h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    End-to-end digital solutions tailored to your business
                    needs.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Work Section */}
          <Suspense fallback={<div>Loading projects...</div>}>
            <WorkSection />
          </Suspense>

          {/* Contact Section */}
          <section
            id="contact"
            className={`py-32 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
          >
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-16 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Get in Touch
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`p-6 md:p-8 rounded-2xl ${isDarkMode ? 'bg-black' : 'bg-white shadow-lg'
                    }`}
                >
                  <Suspense fallback={<div>Loading form...</div>}>
                    <ContactForm isDarkMode={isDarkMode} />
                  </Suspense>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-purple-500 bg-opacity-10">
                      <Phone className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Phone</h3>
                      <p
                        className={
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }
                      >
                        +91 8329713051
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-indigo-500 bg-opacity-10">
                      <Mail className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Email</h3>
                      <p
                        className={
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }
                      >
                        fingertipventures@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    {/* <div className="p-3 rounded-lg bg-pink-500 bg-opacity-10">
                      <MapPin className="w-6 h-6 text-pink-500" />
                    </div> */}
                    {/* <div>
                      <h3 className="text-xl font-semibold mb-1">Location</h3>
                      <p
                        className={
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }
                      >
                        123 Innovation Street
                        <br />
                        Tech City, TC 12345
                      </p>
                    </div> */}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default App;