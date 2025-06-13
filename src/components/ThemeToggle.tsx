import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 p-2.5 rounded-full bg-white/80 dark:bg-dark-secondary/80 backdrop-blur-sm shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 z-[100]"
      style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem' }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        {theme === 'dark' ? (
          <FaSun className="w-4 h-4 text-yellow-400" />
        ) : (
          <FaMoon className="w-4 h-4 text-gray-700" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 