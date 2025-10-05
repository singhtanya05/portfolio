import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaAws, FaGoogle, FaDocker, FaTimes, FaFileDownload } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import photo from '../assets/photo.jpg';
import oreillyLogo from '../assets/oreilly-logo.svg';
import az900Cert from '../assets/certificates/az900Certificate.jpg';
import az104Cert from '../assets/certificates/az104Certificate.jpg';
import az400Cert from '../assets/certificates/az400Certificate.jpg';
import az900Logo from '../assets/logo/az900.svg';
import az104Logo from '../assets/logo/az104.svg';
import az400Logo from '../assets/logo/az400.svg';
import awsCert from '../assets/certificates/aws-certified-cloud-practitioner.png';
import awsLogo from '../assets/logo/aws-certified-cloud-practitioner.png';
import gcpCert from '../assets/certificates/gcpCertificate.jpg';
import gcpLogo from '../assets/logo/gcpLogo.png';

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const gradientY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const [selectedCert, setSelectedCert] = useState<{
    name: string;
    image: string;
    provider: string;
  } | null>(null);

  const handleCertClick = (cert: { name: string; image: string; provider: string }) => {
    setSelectedCert(cert);
  };

  const handleCloseCertModal = () => {
    setSelectedCert(null);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseCertModal();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Add Puzzle component
  const Puzzle: React.FC = () => {
    const [tiles, setTiles] = useState<number[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [message, setMessage] = useState('');
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);

    const puzzleImages = [
      {
        url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        name: 'Tech Setup'
      },
      {
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        name: 'Sports Car'
      },
      {
        url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        name: 'Rocket Launch'
      },
      {
        url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        name: 'Happy Dog'
      },
      {
        url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        name: 'Space Galaxy'
      }
    ];

    // Preload images
    useEffect(() => {
      puzzleImages.forEach(img => {
        const image = new Image();
        image.src = img.url;
      });
    }, []);

    useEffect(() => {
      initializePuzzle();
    }, []);

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isPlaying && !isComplete && hasStarted) {
        timer = setInterval(() => {
          setTime(prev => prev + 1);
        }, 1000);
      }
      return () => clearInterval(timer);
    }, [isPlaying, isComplete, hasStarted]);

    const initializePuzzle = () => {
      const numbers = Array.from({ length: 8 }, (_, i) => i + 1);
      numbers.push(0); // Empty tile
      setTiles(shuffleArray([...numbers]));
      setMoves(0);
      setTime(0);
      setIsPlaying(true);
      setIsComplete(false);
      setHasStarted(false);
      setImageLoaded(false);
      
      // Select random image
      const randomImage = puzzleImages[Math.floor(Math.random() * puzzleImages.length)];
      setCurrentImage(randomImage.url);

      // Preload the selected image
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.src = randomImage.url;
    };

    const shuffleArray = (array: number[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const handleTileClick = (index: number) => {
      if (isComplete) return;
      
      const emptyIndex = tiles.indexOf(0);
      const isAdjacent = (
        index === emptyIndex - 1 ||
        index === emptyIndex + 1 ||
        index === emptyIndex - 3 ||
        index === emptyIndex + 3
      );

      if (isAdjacent) {
        if (!hasStarted) {
          setHasStarted(true);
        }
        const newTiles = [...tiles];
        [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
        setTiles(newTiles);
        setMoves(prev => prev + 1);
        checkCompletion(newTiles);
      }
    };

    const checkCompletion = (currentTiles: number[]) => {
      const isCorrect = currentTiles.every((tile, index) => {
        if (index === 8) return tile === 0;
        return tile === index + 1;
      });

      if (isCorrect) {
        setIsComplete(true);
        setIsPlaying(false);
        setMessage(`Congratulations! You solved the puzzle in ${moves} moves and ${time} seconds! 🎉`);
      }
    };

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div className="space-y-4">
        {/* Stats */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-[#0077b6] dark:text-[#caf0f8] font-medium">
            Moves: {moves}
          </div>
          <div className="text-[#0077b6] dark:text-[#caf0f8] font-medium">
            Time: {formatTime(time)}
          </div>
        </div>

        {/* Puzzle Grid */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#0077b6]/5 dark:bg-[#90e0ef]/20 p-3 rounded-xl">
          {tiles.map((tile, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: tile !== 0 ? 1.02 : 1 }}
              whileTap={{ scale: tile !== 0 ? 0.98 : 1 }}
              onClick={() => handleTileClick(index)}
              className={`w-28 h-28 rounded-lg flex items-center justify-center text-xl font-bold relative overflow-hidden focus:outline-none
                ${tile === 0 ? 'bg-transparent' : 'bg-[#0077b6]/10 dark:bg-[#90e0ef]/30 backdrop-blur-sm cursor-pointer'}
                ${isComplete ? 'pointer-events-none' : ''}
                transition-all duration-300 hover:shadow-lg border border-[#0077b6]/20 dark:border-[#90e0ef]/30`}
            >
              {tile !== 0 && (
                <div 
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage: `url('${currentImage}')`,
                    backgroundSize: '300% 300%',
                    backgroundPosition: `${((tile - 1) % 3) * 50}% ${Math.floor((tile - 1) / 3) * 50}%`
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#03045e] font-semibold"
            >
              {message}
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden dark:bg-black flex flex-col">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-[#e0f7ff] via-[#b8e9f5] to-[#e0f7ff] dark:from-[#03045e] dark:via-black dark:to-[#03045e] animate-gradient"
        style={{
          backgroundSize: '400% 400%',
          y: gradientY,
          padding: '2rem',
          margin: '-2rem'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f7ff]/30 to-[#b8e9f5]/30 dark:from-[#03045e]/30 dark:to-black/30 opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-6"
              >
                <h2 className="text-xl sm:text-2xl text-[#0077b6] dark:text-[#90e0ef] font-medium mb-2">
                  Welcome to my Portfolio
                </h2>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#03045e] dark:text-[#caf0f8] mb-6">
                  <TypeAnimation
                    sequence={[
                      'Hi, I\'m Tanya_',
                      2000,
                      '',
                      500,
                      'Hola, soy Tanya_',
                      2000,
                      '',
                      500,
                      'Bonjour, je suis Tanya_',
                      2000,
                      '',
                      500,
                      'नमस्ते, मैं Tanya हूँ_',
                      2000,
                      '',
                      500,
                    ]}
                    wrapper="span"
                    speed={30}
                    repeat={Infinity}
                    cursor={false}
                    style={{ display: 'inline-block' }}
                    className="text-[#0077b6] dark:text-[#90e0ef]"
                  />
                </h1>
                <p className="text-lg sm:text-xl text-[#03045e] dark:text-[#caf0f8] mb-8 max-w-2xl mx-auto lg:mx-0">
                  Backend specialist focused on building robust, scalable applications using Java, Spring Boot, and cloud technologies
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
              >
                {/* Buttons removed */}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex justify-center lg:justify-start gap-6"
              >
                <motion.a
                  href="https://github.com/singhtanya05"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl text-[#03045e] dark:text-[#caf0f8] hover:text-[#0077b6] dark:hover:text-[#90e0ef] transition-colors"
                >
                  <FaGithub />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/tanyatanyaa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl text-[#03045e] dark:text-[#caf0f8] hover:text-[#0077b6] dark:hover:text-[#90e0ef] transition-colors"
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  href="mailto:tanyakv1511@gmail.com"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl text-[#03045e] dark:text-[#caf0f8] hover:text-[#0077b6] dark:hover:text-[#90e0ef] transition-colors"
                >
                  <FaEnvelope />
                </motion.a>
                <motion.a
                  href="/assets/resume.pdf"
                  download="Tanya_Resume.pdf"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl text-[#03045e] dark:text-[#caf0f8] hover:text-[#0077b6] dark:hover:text-[#90e0ef] transition-colors"
                  title="Download Resume"
                >
                  <FaFileDownload />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Column - Photo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center lg:justify-end"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                {/* Decorative circles */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] rounded-full opacity-20 blur-xl"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-[#00b4d8] to-[#0077b6] rounded-full opacity-20 blur-xl"
                />

                {/* Main photo container */}
                <div 
                  className="relative group perspective-1000"
                >
                  {/* Creative background elements */}
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-all duration-500 animate-pulse"></div>
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gradient-to-br from-sky-400 to-sky-600 dark:from-sky-500 dark:to-sky-700 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-all duration-500 animate-pulse"></div>
                  
                  {/* Shuffled card frame */}
                  <div className="relative transform group-hover:scale-105 transition-all duration-500">
                    {/* First card layer */}
                    <div className="absolute -top-4 -right-4 w-96 h-96 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-[2.5rem] transform rotate-6 group-hover:rotate-8 transition-all duration-500"></div>
                    {/* Second card layer */}
                    <div className="absolute -bottom-4 -left-4 w-96 h-96 bg-gradient-to-br from-sky-400 to-sky-600 dark:from-sky-500 dark:to-sky-700 rounded-[2.5rem] transform -rotate-6 group-hover:-rotate-8 transition-all duration-500"></div>
                    {/* Main photo card */}
                    <div className="relative bg-black/10 backdrop-blur-md rounded-[2.5rem] p-2 overflow-hidden">
                      {/* Creative overlay effects */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      
                      <div className="relative overflow-hidden rounded-[2.5rem]">
                        <img
                          src={photo}
                          alt="Profile"
                          className="w-96 h-96 object-cover transform group-hover:scale-110 transition-all duration-700"
                        />
                        
                        {/* Interactive overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            {/* Social links with creative design */}
                            <div className="flex justify-center gap-6">
                              <motion.a
                                href="https://github.com/singhtanya05"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, y: -5, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="relative group"
                              >
                                <div className="absolute inset-0 bg-blue-400 dark:bg-blue-500 rounded-full opacity-30 group-hover:opacity-40 transition-all duration-300 group-hover:rotate-12"></div>
                                <FaGithub className="w-6 h-6 text-white relative z-10" />
                              </motion.a>
                              <motion.a
                                href="https://www.linkedin.com/in/tanyatanyaa/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, y: -5, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className="relative group"
                              >
                                <div className="absolute inset-0 bg-sky-400 dark:bg-sky-500 rounded-full opacity-30 group-hover:opacity-40 transition-all duration-300 group-hover:-rotate-12"></div>
                                <FaLinkedin className="w-6 h-6 text-white relative z-10" />
                              </motion.a>
                              <motion.a
                                href="mailto:tanyakv1511@gmail.com"
                                whileHover={{ scale: 1.2, y: -5, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="relative group"
                              >
                                <div className="absolute inset-0 bg-blue-500 dark:bg-blue-600 rounded-full opacity-30 group-hover:opacity-40 transition-all duration-300 group-hover:rotate-12"></div>
                                <FaEnvelope className="w-6 h-6 text-white relative z-10" />
                              </motion.a>
                              <motion.a
                                href="/resume.pdf"
                                download="Tanya_Resume.pdf"
                                whileHover={{ scale: 1.2, y: -5, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className="relative group"
                              >
                                <div className="absolute inset-0 bg-sky-500 dark:bg-sky-600 rounded-full opacity-30 group-hover:opacity-40 transition-all duration-300 group-hover:-rotate-12"></div>
                                <FaFileDownload className="w-6 h-6 text-white relative z-10" />
                              </motion.a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Creative floating elements */}
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-6 -right-6 w-10 h-10 border-2 border-blue-400 dark:border-blue-500 rounded-full opacity-30"
                  />
                  <motion.div
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-6 -left-6 w-10 h-10 border-2 border-sky-400 dark:border-sky-500 rounded-full opacity-30"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/2 -left-12 transform -translate-y-1/2">
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-24 h-24 border-2 border-blue-400 dark:border-blue-500 rounded-full opacity-20"
                  />
                </div>
                <div className="absolute top-1/2 -right-12 transform -translate-y-1/2">
                  <motion.div
                    animate={{
                      y: [0, 20, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-24 h-24 border-2 border-sky-400 dark:border-sky-500 rounded-full opacity-20"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f7ff]/20 to-[#b8e9f5]/20 dark:from-[#03045e]/20 dark:to-black/20 opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#03045e] dark:text-[#caf0f8] mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0077b6] to-[#90e0ef] mx-auto rounded-full"></div>
          </motion.div>

          <div className="flex overflow-x-auto pb-8 gap-4 sm:gap-6 md:gap-8 snap-x snap-mandatory">
            {/* Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative flex-none w-[280px] sm:w-[320px] md:w-[350px] h-auto min-h-[450px] md:h-[500px] snap-center"
            >
              <div className="bg-[#90e0ef] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  <img
                    src="https://placehold.co/800x600/0077b6/ffffff?text=Cloud+Migration"
                    alt="Cloud Migration Project"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03045e]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-[#03045e] mb-2">Cloud Migration Project</h3>
                  <p className="text-sm sm:text-base text-[#03045e] mb-4 flex-1">
                    Successfully migrated legacy applications to cloud infrastructure, reducing operational costs by 40% and improving system reliability.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 sm:px-3 py-1 bg-[#caf0f8] text-[#0077b6] rounded-full text-xs sm:text-sm">AWS</span>
                    <span className="px-2 sm:px-3 py-1 bg-[#caf0f8] text-[#0077b6] rounded-full text-xs sm:text-sm">Docker</span>
                    <span className="px-2 sm:px-3 py-1 bg-[#caf0f8] text-[#0077b6] rounded-full text-xs sm:text-sm">Kubernetes</span>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <a
                      href="https://github.com/singhtanya05/project"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-[#0077b6] hover:text-[#03045e] font-medium flex items-center gap-1 sm:gap-2"
                    >
                      View Project
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/singhtanya05/project"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0077b6] hover:text-[#03045e] transition-colors"
                    >
                      <FaGithub className="text-2xl" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative flex-none w-[280px] sm:w-[320px] md:w-[350px] h-auto min-h-[450px] md:h-[500px] snap-center"
            >
              <div className="bg-[#90e0ef] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  <img
                    src="https://placehold.co/800x600/0077b6/ffffff?text=DevOps+Pipeline"
                    alt="DevOps Pipeline Project"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03045e]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-[#03045e] mb-2">DevOps Pipeline Project</h3>
                  <p className="text-sm sm:text-base text-[#03045e] mb-4 flex-1">
                    Implemented CI/CD pipelines using Jenkins and GitHub Actions, reducing deployment time by 60% and improving code quality.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 sm:px-3 py-1 bg-[#caf0f8] text-[#0077b6] rounded-full text-xs sm:text-sm">Jenkins</span>
                    <span className="px-2 sm:px-3 py-1 bg-[#caf0f8] text-[#0077b6] rounded-full text-xs sm:text-sm">GitHub Actions</span>
                    <span className="px-2 sm:px-3 py-1 bg-[#caf0f8] text-[#0077b6] rounded-full text-xs sm:text-sm">Docker</span>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <a
                      href="https://github.com/singhtanya05/project"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-[#0077b6] hover:text-[#03045e] font-medium flex items-center gap-1 sm:gap-2"
                    >
                      View Project
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/singhtanya05/project"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0077b6] hover:text-[#03045e] transition-colors"
                    >
                      <FaGithub className="text-2xl" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative flex-none w-[280px] sm:w-[320px] md:w-[350px] h-auto min-h-[450px] md:h-[500px] snap-center"
            >
              <div className="bg-[#90e0ef] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  <img
                    src="https://placehold.co/800x600/0077b6/ffffff?text=Kubernetes+Cluster"
                    alt="Kubernetes Cluster Project"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03045e]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-[#03045e] mb-2">Kubernetes Cluster Project</h3>
                  <p className="text-sm sm:text-base text-[#03045e] mb-4 flex-1">
                    Designed and implemented a scalable Kubernetes cluster for microservices architecture, improving system reliability and scalability.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 sm:px-3 py-1 bg-[#caf0f8] text-[#0077b6] rounded-full text-xs sm:text-sm">Kubernetes</span>
                    <span className="px-2 sm:px-3 py-1 bg-[#caf0f8] text-[#0077b6] rounded-full text-xs sm:text-sm">Helm</span>
                    <span className="px-2 sm:px-3 py-1 bg-[#caf0f8] text-[#0077b6] rounded-full text-xs sm:text-sm">Prometheus</span>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <a
                      href="https://github.com/singhtanya05/project"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-[#0077b6] hover:text-[#03045e] font-medium flex items-center gap-1 sm:gap-2"
                    >
                      View Project
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/singhtanya05/project"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0077b6] hover:text-[#03045e] transition-colors"
                    >
                      <FaGithub className="text-2xl" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a
              href="https://github.com/singhtanya05"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0077b6] to-[#90e0ef] text-white rounded-full hover:from-[#03045e] hover:to-[#0077b6] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Projects
              <FaGithub className="text-xl" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f7ff]/20 to-[#b8e9f5]/20 dark:from-[#03045e]/20 dark:to-black/20 opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#03045e] dark:text-[#caf0f8] mb-4">
              Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0077b6] to-[#90e0ef] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Cloud & DevOps Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#90e0ef]/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0077b6] to-[#90e0ef] flex items-center justify-center shadow-md">
                  <FaAws className="text-white text-lg" />
                </div>
                <h3 className="text-sm font-semibold text-[#03045e]">
                  Cloud & DevOps
                </h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'AWS', icon: <FaAws className="text-[#0077b6]" /> },
                  { name: 'Azure', icon: <span className="text-[#0077b6]">☁️</span> },
                  { name: 'Docker', icon: <FaDocker className="text-[#0077b6]" /> },
                  { name: 'Kubernetes', icon: <span className="text-[#0077b6]">⚓</span> },
                  { name: 'GitHub Actions', icon: <FaGithub className="text-[#0077b6]" /> }
                ].map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-2 py-1.5 bg-[#f8f9fa] text-[#0077b6] rounded-lg hover:bg-gradient-to-r hover:from-[#0077b6] hover:to-[#90e0ef] hover:text-white transition-all duration-300 text-sm shadow-sm"
                  >
                    {skill.icon}
                    <span className="font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Programming Languages & Frameworks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#90e0ef]/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0077b6] to-[#90e0ef] flex items-center justify-center shadow-md">
                  <span className="text-white text-lg">⚡</span>
                </div>
                <h3 className="text-sm font-semibold text-[#03045e]">
                  Programming
                </h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Java', level: '95%' },
                  { name: 'Spring Boot', level: '90%' },
                  { name: 'Hibernate', level: '85%' },
                  { name: 'SQL', level: '90%' },
                  { name: 'OAuth2.0/JWT', level: '85%' }
                ].map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#03045e] font-medium">{skill.name}</span>
                      <span className="text-[#0077b6]">{skill.level}</span>
                    </div>
                    <div className="w-full bg-[#f8f9fa] rounded-full h-1.5 shadow-sm">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-1.5 bg-gradient-to-r from-[#0077b6] to-[#90e0ef] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Databases & Message Brokers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#90e0ef]/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0077b6] to-[#90e0ef] flex items-center justify-center shadow-md">
                  <span className="text-white text-lg">🗄️</span>
                </div>
                <h3 className="text-sm font-semibold text-[#03045e]">
                  Databases
                </h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'MySQL', icon: '🐬' },
                  { name: 'PostgreSQL', icon: '🐘' },
                  { name: 'Redis', icon: '🔴' },
                  { name: 'Kafka', icon: '📨' }
                ].map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-2 py-1.5 bg-[#f8f9fa] text-[#0077b6] rounded-lg hover:bg-gradient-to-r hover:from-[#0077b6] hover:to-[#90e0ef] hover:text-white transition-all duration-300 text-sm shadow-sm"
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Architecture & Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#90e0ef]/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0077b6] to-[#90e0ef] flex items-center justify-center shadow-md">
                  <span className="text-white text-lg">🏗️</span>
                </div>
                <h3 className="text-sm font-semibold text-[#03045e]">
                  Architecture
                </h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Microservices', icon: '🔧' },
                  { name: 'Event-Driven', icon: '⚡' },
                  { name: 'RESTful APIs', icon: '🌐' },
                  { name: 'System Design', icon: '📐' }
                ].map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-2 py-1.5 bg-[#f8f9fa] text-[#0077b6] rounded-lg hover:bg-gradient-to-r hover:from-[#0077b6] hover:to-[#90e0ef] hover:text-white transition-all duration-300 text-sm shadow-sm"
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tools & Testing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#90e0ef]/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0077b6] to-[#90e0ef] flex items-center justify-center shadow-md">
                  <span className="text-white text-lg">🛠️</span>
                </div>
                <h3 className="text-sm font-semibold text-[#03045e]">
                  Tools & Testing
                </h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Postman', icon: '📬' },
                  { name: 'Swagger', icon: '📝' },
                  { name: 'JUnit', icon: '🧪' },
                  { name: 'Linux', icon: '🐧' }
                ].map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-2 py-1.5 bg-[#f8f9fa] text-[#0077b6] rounded-lg hover:bg-gradient-to-r hover:from-[#0077b6] hover:to-[#90e0ef] hover:text-white transition-all duration-300 text-sm shadow-sm"
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f7ff]/20 to-[#b8e9f5]/20 dark:from-[#03045e]/20 dark:to-black/20 opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#03045e] dark:text-[#caf0f8] mb-4">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0077b6] to-[#90e0ef] mx-auto rounded-full"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* BlackNGreen - Senior Software Engineer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative pl-8 pb-4 border-l-2 border-[#0077b6]"
            >
              <div className="absolute -left-3 top-0 w-5 h-5 rounded-full bg-[#0077b6]"></div>
              <div className="bg-[#90e0ef] rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#caf0f8] text-[#0077b6] rounded-full">
                    Jan 2025 - Present
                  </span>
                  <h3 className="text-lg font-semibold text-[#03045e]">
                    Senior Software Engineer
                  </h3>
                  <span className="text-sm text-[#03045e]">BlackNGreen</span>
                </div>
                <div className="space-y-2">
                  {/* <p className="text-sm text-[#03045e]"> 
                    • Architected and developed event-driven microservices for AI assistant systems using Spring Boot and Kafka
                  </p>
                  <p className="text-sm text-[#03045e]">
                    • Built enterprise-grade authentication systems with OAuth2.0 and JWT for enhanced security
                  </p>
                  <p className="text-sm text-[#03045e]">
                    • Implemented containerization using Docker and Kubernetes for streamlined deployments
                  </p> */}
                </div>
              </div>
            </motion.div>

            {/* TCS - Software Engineer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative pl-8 pb-4 border-l-2 border-[#0077b6]"
            >
              <div className="absolute -left-3 top-0 w-5 h-5 rounded-full bg-[#0077b6]"></div>
              <div className="bg-[#90e0ef] rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#caf0f8] text-[#0077b6] rounded-full">
                    Nov 2022 - Jan 2025
                  </span>
                  <h3 className="text-lg font-semibold text-[#03045e]">
                    Software Engineer
                  </h3>
                  <span className="text-sm text-[#03045e]">Tata Consultancy Services</span>
                </div>
                {/* <div className="space-y-2">
                  <p className="text-sm text-[#03045e]">
                    • Developed and optimized Java backend applications, achieving 30% performance improvement
                  </p>
                  <p className="text-sm text-[#03045e]">
                    • Implemented comprehensive API documentation using Swagger and Postman
                  </p>
                  <p className="text-sm text-[#03045e]">
                    • Reduced resource consumption by 25% through code optimization
                  </p>
                </div> */}
              </div>
            </motion.div>

            {/* TCS - Associate Software Engineer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative pl-8 pb-4 border-l-2 border-[#0077b6]"
            >
              <div className="absolute -left-3 top-0 w-5 h-5 rounded-full bg-[#0077b6]"></div>
              <div className="bg-[#90e0ef] rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#caf0f8] text-[#0077b6] rounded-full">
                    Nov 2021 - Oct 2022
                  </span>
                  <h3 className="text-lg font-semibold text-[#03045e]">
                    Associate Software Engineer
                  </h3>
                  <span className="text-sm text-[#03045e]">Tata Consultancy Services</span>
                </div>
                {/* <div className="space-y-2">
                  <p className="text-sm text-[#03045e]">
                    • Contributed to Java backend development and maintenance of enterprise applications
                  </p>
                  <p className="text-sm text-[#03045e]">
                    • Participated in code reviews and implemented best practices for code quality
                  </p>
                  <p className="text-sm text-[#03045e]">
                    • Collaborated with senior developers to implement new features and bug fixes
                  </p>
                </div> */}
              </div>
            </motion.div>

            {/* Cadence - Software Engineer Intern */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative pl-8 pb-4 border-l-2 border-[#0077b6]"
            >
              <div className="absolute -left-3 top-0 w-5 h-5 rounded-full bg-[#0077b6]"></div>
              <div className="bg-[#90e0ef] rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#caf0f8] text-[#0077b6] rounded-full">
                    Aug 2021 - Nov 2021
                  </span>
                  <h3 className="text-lg font-semibold text-[#03045e]">
                    Software Engineer Intern
                  </h3>
                  <span className="text-sm text-[#03045e]">Cadence</span>
                </div>
                {/* <div className="space-y-2">
                  <p className="text-sm text-[#03045e]">
                    • Managed version control and documentation using project management tools
                  </p>
                  <p className="text-sm text-[#03045e]">
                    • Collaborated with cross-functional teams on technical documentation
                  </p>
                </div> */}
              </div>
            </motion.div>

            {/* Suncity Real Estate - Software Engineer Intern */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative pl-8 border-l-2 border-[#0077b6]"
            >
              <div className="absolute -left-3 top-0 w-5 h-5 rounded-full bg-[#0077b6]"></div>
              <div className="bg-[#90e0ef] rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#caf0f8] text-[#0077b6] rounded-full">
                    May 2020 - July 2020
                  </span>
                  <h3 className="text-lg font-semibold text-[#03045e]">
                    Software Engineer Intern
                  </h3>
                  <span className="text-sm text-[#03045e]">Suncity Real Estate</span>
                </div>
                {/* <div className="space-y-2">
                  <p className="text-sm text-[#03045e]">
                    • Developed custom software solutions under senior engineer guidance
                  </p>
                  <p className="text-sm text-[#03045e]">
                    • Implemented bug fixes and performance improvements
                  </p>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f7ff]/20 to-[#b8e9f5]/20 dark:from-[#03045e]/20 dark:to-black/20 opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#03045e] dark:text-[#caf0f8] mb-4">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0077b6] to-[#90e0ef] mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative pl-8 border-l-2 border-[#0077b6]"
            >
              <div className="absolute -left-3 top-0 w-5 h-5 rounded-full bg-[#0077b6]"></div>
              <div className="bg-[#90e0ef] rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#caf0f8] text-[#0077b6] rounded-full">
                    2017 - 2021
                  </span>
                  <h3 className="text-lg font-semibold text-[#03045e]">
                    Bachelor of Technology
                  </h3>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-[#03045e]">
                    • Awarded Highest Academic Performance for securing second rank in college
                  </p>
                  <p className="text-sm text-[#03045e]">
                    • Graduated with Distinction (CGPA: 8.6)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f7ff]/20 to-[#b8e9f5]/20 dark:from-[#03045e]/20 dark:to-black/20 opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#03045e] dark:text-[#caf0f8] mb-4">
              Professional Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0077b6] to-[#90e0ef] mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {/* Azure */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative group"
              >
                <div className="w-24 h-24 mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" alt="Azure" className="w-16 h-16" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" alt="Azure" className="w-8 h-8" />
                    <h3 className="text-lg font-semibold text-[#03045e]">Microsoft Azure</h3>
              </div>
                    <div className="space-y-3">
                      {[
                        { 
                          name: 'Azure Fundamentals', 
                          date: '2024',
                          code: 'AZ-900',
                          image: az900Cert,
                          logo: az900Logo
                        },
                        { 
                          name: 'Azure Administrator Associate', 
                          date: '2024',
                          code: 'AZ-104',
                          image: az104Cert,
                          logo: az104Logo
                        },
                        { 
                          name: 'Azure DevOps Engineer Expert', 
                          date: '2024',
                          code: 'AZ-400',
                          image: az400Cert,
                          logo: az400Logo
                        }
                      ].map((cert) => (
                        <motion.div
                          key={cert.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCertClick({ name: cert.name, image: cert.image, provider: 'Azure' })}
                          className="bg-[#caf0f8]/50 rounded-xl p-3 cursor-pointer hover:bg-[#caf0f8] transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <img src={cert.logo} alt={cert.name} className="w-8 h-8" />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-[#03045e]">{cert.name}</h4>
                              <p className="text-xs text-[#0077b6]">{cert.code}</p>
                              <p className="text-xs text-[#0077b6]">{cert.date}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
            </motion.div>

                {/* AWS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative group"
                >
                  <div className="w-24 h-24 mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300">
                    <FaAws className="text-[#0077b6] text-5xl" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <FaAws className="text-[#0077b6] text-2xl" />
                      <h3 className="text-lg font-semibold text-[#03045e]">Amazon Web Services</h3>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCertClick({ 
                        name: 'AWS Certified Cloud Practitioner', 
                        image: awsCert,
                        provider: 'AWS'
                      })}
                      className="bg-[#caf0f8]/50 rounded-xl p-3 cursor-pointer hover:bg-[#caf0f8] transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <img src={awsLogo} alt="AWS Practitioner" className="w-8 h-8" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-[#03045e]">AWS Certified Cloud Practitioner</h4>
                          <p className="text-xs text-[#0077b6]">CLF-C02</p>
                          <p className="text-xs text-[#0077b6]">2024</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* GCP */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative group"
                >
                  <div className="w-24 h-24 mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300">
                    <FaGoogle className="text-[#0077b6] text-5xl" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <FaGoogle className="text-[#0077b6] text-2xl" />
                      <h3 className="text-lg font-semibold text-[#03045e]">Google Cloud Platform</h3>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCertClick({ 
                        name: 'Google Cloud Digital Leader', 
                        image: gcpCert,
                        provider: 'GCP'
                      })}
                      className="bg-[#caf0f8]/50 rounded-xl p-3 cursor-pointer hover:bg-[#caf0f8] transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <img src={gcpLogo} alt="GCP Digital Leader" className="w-8 h-8" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-[#03045e]">Google Cloud Digital Leader</h4>
                          <p className="text-xs text-[#0077b6]">GCP-DL</p>
                          <p className="text-xs text-[#0077b6]">2024</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* O'Reilly */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative group"
                >
                  <div className="w-24 h-24 mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300">
                    <img src={oreillyLogo} alt="O'Reilly" className="w-16 h-16" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={oreillyLogo} alt="O'Reilly" className="w-8 h-8" />
                      <h3 className="text-lg font-semibold text-[#03045e]">O'Reilly</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { 
                          name: 'Clean Code', 
                          date: '2024',
                          image: '/certificates/clean-code.pdf',
                          logo: oreillyLogo
                        },
                        { 
                          name: 'Java Lambdas and Streams', 
                          date: '2024',
                          image: '/certificates/java-lambdas-and-streams.pdf',
                          logo: oreillyLogo
                        },
                        { 
                          name: 'Microservices Data Decomposition', 
                          date: '2024',
                          image: '/certificates/microservices-data-decomp.pdf',
                          logo: oreillyLogo
                        },
                        { 
                          name: 'Microservices Caching', 
                          date: '2024',
                          image: '/certificates/microservices-caching.pdf',
                          logo: oreillyLogo
                        }
                      ].map((cert) => (
                        <motion.div
                          key={cert.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCertClick({ name: cert.name, image: cert.image, provider: 'O\'Reilly' })}
                          className="bg-[#caf0f8]/50 rounded-xl p-3 cursor-pointer hover:bg-[#caf0f8] transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <img src={oreillyLogo} alt={cert.name} className="w-8 h-8" />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-[#03045e]">{cert.name}</h4>
                              <p className="text-xs text-[#0077b6]">{cert.date}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* GitHub */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative group"
                >
                  <div className="w-24 h-24 mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300">
                    <FaGithub className="text-[#0077b6] text-5xl" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <FaGithub className="text-[#0077b6] text-2xl" />
                      <h3 className="text-lg font-semibold text-[#03045e]">GitHub</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { 
                          name: 'GitHub Foundations', 
                          date: '2024',
                          image: '/certificates/github-foundations.pdf',
                          logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                        },
                        { 
                          name: 'GitHub Actions', 
                          date: '2024',
                          image: '/certificates/github-actions.pdf',
                          logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                        }
                      ].map((cert) => (
                        <motion.div
                          key={cert.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCertClick({ name: cert.name, image: cert.image, provider: 'GitHub' })}
                          className="bg-[#caf0f8]/50 rounded-xl p-3 cursor-pointer hover:bg-[#caf0f8] transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <img src={cert.logo} alt={cert.name} className="w-8 h-8" />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-[#03045e]">{cert.name}</h4>
                              <p className="text-xs text-[#0077b6]">{cert.date}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Udemy */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative group"
                >
                  <div className="w-24 h-24 mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300">
                    <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt="Udemy" className="w-16 h-16" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt="Udemy" className="w-8 h-8" />
                      <h3 className="text-lg font-semibold text-[#03045e]">Udemy</h3>
              </div>
                    <div className="space-y-3">
                      {[
                        { 
                          name: 'Docker & Kubernetes', 
                          date: '2024',
                          image: 'https://placehold.co/800x600/0077b6/ffffff?text=Udemy+Docker+%26+Kubernetes',
                          logo: 'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg'
                        },
                        { 
                          name: 'Terraform Masterclass', 
                          date: '2023',
                          image: 'https://placehold.co/800x600/0077b6/ffffff?text=Udemy+Terraform',
                          logo: 'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg'
                        }
                      ].map((cert) => (
                        <motion.div
                          key={cert.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCertClick({ name: cert.name, image: cert.image, provider: 'Udemy' })}
                          className="bg-[#caf0f8]/50 rounded-xl p-3 cursor-pointer hover:bg-[#caf0f8] transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt={cert.name} className="w-8 h-8" />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-[#03045e]">{cert.name}</h4>
                              <p className="text-xs text-[#0077b6]">{cert.date}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
            </motion.div>
              </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f7ff]/20 to-[#b8e9f5]/20 dark:from-[#03045e]/20 dark:to-black/20 opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#03045e] dark:text-[#caf0f8] mb-4">
              Latest Articles
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0077b6] to-[#90e0ef] mx-auto rounded-full"></div>
          </motion.div>

          <div className="flex overflow-x-auto pb-8 gap-4 sm:gap-6 md:gap-8 snap-x snap-mandatory">
            {/* Blog Post 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative flex-none w-[280px] sm:w-[320px] md:w-[350px] h-auto min-h-[450px] md:h-[500px] snap-center"
            >
              <div className="bg-[#90e0ef] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  <img
                    src="https://placehold.co/800x600/0077b6/ffffff?text=Rate+Limiting"
                    alt="Rate Limiting Article"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03045e]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-sm font-medium text-[#0077b6] bg-[#caf0f8] rounded-full">
                      Backend
                    </span>
                    <span className="text-sm text-[#03045e]">
                      10 min read
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#03045e] mb-2">
                    Unlocking Resilience: Why Distributed Rate Limiting with Redis Is Critical for Modern APIs
                  </h3>
                  <p className="text-sm sm:text-base text-[#03045e] mb-4 flex-1">
                    A comprehensive guide to implementing distributed rate limiting using Redis, ensuring your APIs remain resilient and scalable...
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <a
                      href="https://tanyaaaaa.medium.com/unlocking-resilience-why-distributed-rate-limiting-with-redis-is-critical-for-modern-apis-8e474aa59bfe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-[#0077b6] hover:text-[#03045e] font-medium flex items-center gap-1 sm:gap-2"
                    >
                      Read Article
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    <span className="text-sm text-[#03045e]">
                      May 16, 2024
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Blog Post 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative flex-none w-[280px] sm:w-[320px] md:w-[350px] h-auto min-h-[450px] md:h-[500px] snap-center"
            >
              <div className="bg-[#90e0ef] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  <img
                    src="https://placehold.co/800x600/0077b6/ffffff?text=CI+CD"
                    alt="CI/CD Article"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03045e]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-sm font-medium text-[#0077b6] bg-[#caf0f8] rounded-full">
                      DevOps
                    </span>
                    <span className="text-sm text-[#03045e]">
                      8 min read
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#03045e] mb-2">
                    Implementing CI/CD with GitHub Actions
                  </h3>
                  <p className="text-sm sm:text-base text-[#03045e] mb-4 flex-1">
                    A comprehensive guide to setting up continuous integration and deployment pipelines using GitHub Actions...
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <a
                      href="https://tanyaaaaa.medium.com/implementing-ci-cd-with-github-actions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-[#0077b6] hover:text-[#03045e] font-medium flex items-center gap-1 sm:gap-2"
                    >
                      Read Article
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    <span className="text-sm text-[#03045e]">
                      March 10, 2024
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Blog Post 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative flex-none w-[280px] sm:w-[320px] md:w-[350px] h-auto min-h-[450px] md:h-[500px] snap-center"
            >
              <div className="bg-[#90e0ef] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  <img
                    src="https://placehold.co/800x600/0077b6/ffffff?text=Kubernetes"
                    alt="Kubernetes Article"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03045e]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-sm font-medium text-[#0077b6] bg-[#caf0f8] rounded-full">
                      Kubernetes
                    </span>
                    <span className="text-sm text-[#03045e]">
                      10 min read
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#03045e] mb-2">
                    Kubernetes Best Practices for Production
                  </h3>
                  <p className="text-sm sm:text-base text-[#03045e] mb-4 flex-1">
                    Essential tips and best practices for running Kubernetes clusters in production environments...
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <a
                      href="https://tanyaaaaa.medium.com/kubernetes-best-practices-for-production"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-[#0077b6] hover:text-[#03045e] font-medium flex items-center gap-1 sm:gap-2"
                    >
                      Read Article
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    <span className="text-sm text-[#03045e]">
                      March 5, 2024
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a
              href="https://tanyaaaaa.medium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0077b6] to-[#90e0ef] text-white rounded-full hover:from-[#03045e] hover:to-[#0077b6] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Articles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f7ff]/20 to-[#b8e9f5]/20 dark:from-[#03045e]/20 dark:to-black/20 opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#03045e] dark:text-[#caf0f8] mb-4">
              Get in Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#90e0ef] to-[#caf0f8] dark:from-[#90e0ef] dark:to-[#caf0f8] mx-auto rounded-full"></div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6 relative h-full flex flex-col justify-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#90e0ef] flex items-center justify-center">
                  <FaEnvelope className="text-[#0077b6] text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#03045e] dark:text-[#caf0f8]">
                    Email
                  </h3>
                  <a
                    href="mailto:tanyakv1511@gmail.com"
                    className="text-[#03045e] dark:text-[#caf0f8] hover:text-[#0077b6] dark:hover:text-[#90e0ef] focus:outline-none"
                  >
                    tanyakv1511@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#90e0ef] flex items-center justify-center">
                  <FaLinkedin className="text-[#0077b6] text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#03045e] dark:text-[#caf0f8]">
                    LinkedIn
                  </h3>
                  <a
                    href="https://www.linkedin.com/in/tanyatanyaa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#03045e] dark:text-[#caf0f8] hover:text-[#0077b6] dark:hover:text-[#90e0ef] focus:outline-none"
                  >
                    linkedin.com/in/tanyatanyaa
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#90e0ef] flex items-center justify-center">
                  <FaGithub className="text-[#0077b6] text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#03045e] dark:text-[#caf0f8]">
                    GitHub
                  </h3>
                  <a
                    href="https://github.com/singhtanya05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#03045e] dark:text-[#caf0f8] hover:text-[#0077b6] dark:hover:text-[#90e0ef] focus:outline-none"
                  >
                    github.com/singhtanya05
                  </a>
                </div>
              </div>
              <div className="hidden md:block absolute right-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[#90e0ef] dark:via-[#caf0f8] to-transparent"></div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-1 relative h-full flex flex-col justify-center"
            >
              <form className="space-y-4 pr-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#03045e] dark:text-[#caf0f8] mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-[#0077b6] bg-[#caf0f8] text-[#03045e] focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#03045e] dark:text-[#caf0f8] mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-[#0077b6] bg-[#caf0f8] text-[#03045e] focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
                    placeholder="mail@gmail.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#03045e] dark:text-[#caf0f8] mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-[#0077b6] bg-[#caf0f8] text-[#03045e] focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#0077b6] to-[#90e0ef] text-white rounded-lg hover:from-[#03045e] hover:to-[#0077b6] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </motion.button>
              </form>
              <div className="hidden md:block absolute right-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[#90e0ef] dark:via-[#caf0f8] to-transparent"></div>
            </motion.div>

            {/* Puzzle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-1 h-full flex flex-col justify-center"
            >
              <div className="space-y-4">
                <Puzzle />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseCertModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#03045e]">{selectedCert.name}</h3>
                <button
                  onClick={handleCloseCertModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>
              <p className="text-[#0077b6] mt-1">{selectedCert.provider}</p>
            </div>
            <div className="p-6 overflow-auto max-h-[calc(90vh-8rem)]">
              {selectedCert.image.endsWith('.pdf') ? (
                <iframe
                  src={selectedCert.image}
                  className="w-full h-[70vh] rounded-lg"
                  title={selectedCert.name}
                />
              ) : (
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      </div>

      <style>
        {`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient {
            animation: gradient 15s ease infinite;
          }
        `}
      </style>

      {/* Footer */}
      <footer className="mt-auto py-2 text-center bg-white/30 dark:bg-black/30 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm text-[#03045e] dark:text-white flex items-center justify-center gap-2"
        >
          Made with <motion.span 
            animate={{ 
              color: ['#ef4444', '#fbbf24', '#ef4444'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="animate-pulse"
          >❤️</motion.span> by Tanya • © {new Date().getFullYear()} All rights reserved
        </motion.div>
      </footer>
    </div>
  );
};

export default Home; 