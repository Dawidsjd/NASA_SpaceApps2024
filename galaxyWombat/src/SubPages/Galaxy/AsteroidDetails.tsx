import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AsteroidDetailsProps {
  label: string;
  description: string;
  onClose: () => void;
}

const AsteroidDetails: React.FC<AsteroidDetailsProps> = ({
  label,
  description,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-1000 flex items-center justify-center space-x-4">
      <motion.div
        ref={popupRef}
        className="relative max-w-5xl p-8 bg-gray-900 rounded-xl shadow-lg flex items-center overflow-visible"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.9,
          y: isVisible ? 0 : 50,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex-1 mr-10">
          <h2 className="text-3xl font-bold text-white mb-4">{label}</h2>
          <p className="text-lg text-gray-400 mb-6">{description}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={handleClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Close
            </button>
          </div>
        </div>

        <motion.img
          src="/assets/wombat-hand.png"
          alt="Asteroid"
          className="w-96 h-auto absolute -right-56 -top-20 transform -translate-y-1/2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 100 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

export default AsteroidDetails;
