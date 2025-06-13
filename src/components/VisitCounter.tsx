import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VisitCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateCounter = async () => {
      try {
        // First, hit the counter to increment it
        await fetch('https://api.countapi.xyz/hit/your-portfolio/visits');
        
        // Then get the current count
        const response = await fetch('https://api.countapi.xyz/get/your-portfolio/visits');
        const data = await response.json();
        setCount(data.value);
      } catch (error) {
        console.error('Error updating counter:', error);
      } finally {
        setIsLoading(false);
      }
    };

    updateCounter();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md dark:bg-gray-800/50 px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
    >
      {isLoading ? (
        <div className="text-sm text-gray-600 dark:text-gray-300">Loading...</div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">Visits:</span>
          <span className="font-bold text-[#0077b6] dark:text-[#90e0ef]">{count.toLocaleString()}</span>
        </div>
      )}
    </motion.div>
  );
};

export default VisitCounter; 