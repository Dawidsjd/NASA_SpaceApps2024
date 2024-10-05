import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

interface PlanetDetailsProps {
  label: string;
  description: string;
  onClose: () => void;
}

const PlanetDetails: React.FC<PlanetDetailsProps> = ({
  label,
  description,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true); // Nowy stan dla widoczności

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
    setIsVisible(false); // Ustawia stan na ukryty (uruchomienie animacji zamykania)
    setTimeout(onClose, 500); // Poczekaj na zakończenie animacji, a następnie wywołaj funkcję zamknięcia
  };

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-1000 flex items-center justify-center space-x-4">
      {/* Dialog */}
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
        {/* Tekst po lewej stronie */}
        <div className="flex-1 mr-10">
          <h2 className="text-3xl font-bold text-white mb-4">{label}</h2>{' '}
          {/* Zmieniono z text-2xl na text-3xl */}
          <p className="text-lg text-gray-400 mb-6">
            {description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br /> {/* Dodaje nową linię */}
              </span>
            ))}
          </p>{' '}
          {/* Zmieniono z text-gray-400 na text-lg */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleClose} // Zmieniono na handleClose, aby dodać animację
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Close
            </button>
          </div>
        </div>

        {/* Obrazek nachodzący na div */}
        <motion.img
          src="/assets/wombat-hand.png"
          alt="Wombat Hand"
          draggable="false"
          className="w-96 h-auto absolute -right-56 -top-24 transform -translate-y-1/2 select-none"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 100 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

export default PlanetDetails;
