import { useState } from 'react';
import { ArrowRight, Cuboid, Globe, Telescope, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Card {
  title: string;
  description: string;
  icon: JSX.Element;
  details: string;
  image: string;
}

const cards: Card[] = [
  {
    title: '3D Game',
    description:
      'Immerse yourself in an interactive 3D game world, where you can explore diverse levels and challenges.',
    icon: <Cuboid className="h-6 w-6 text-blue-400" />,
    details:
      'Our 3D Game is an immersive experience that transports players to a fascinating world full of adventures. Utilizing the latest graphic technologies, we offer realistic environments and smooth gameplay. Players can create their own characters, develop skills, and collaborate with others in multiplayer mode. We regularly add new levels, challenges, and story elements to ensure long-lasting entertainment.',
    image: '/assets/webGame.png',
  },
  {
    title: 'Solar System',
    description:
      'Discover the mysteries of the Solar System and learn about the planets that compose it.',
    icon: <Globe className="h-6 w-6 text-blue-400" />,
    details:
      'Our Solar System app is an interactive guide to the Solar System. Users can explore detailed 3D models of planets, moons, and other celestial bodies. We provide up-to-date astronomical data, interesting facts about each object, and simulations of orbits and moon phases. The app also includes an educational section with quizzes and challenges, perfect for students and astronomy enthusiasts.',
    image: '/assets/spaceSystem.png',
  },
  {
    title: 'Learning Planet',
    description:
      'Learning Planet is a platform that allows you to explore planets, learn about them, and interact with various educational modules...',
    icon: <Telescope className="h-6 w-6 text-blue-400" />,
    details:
      'Learning Planet is an interactive educational platform that lets users explore planets in detail. Each planet is accompanied by fun facts, high-quality images, and interactive modules. Users can test their knowledge with quizzes, discover key facts about the solar system, and engage in learning activities designed to enhance their understanding of astronomy. Whether you are a student or an astronomy enthusiast, this app provides a great educational experience.',
    image: '/assets/Learning_ss.png',
  },
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: Card | null;
  onProceed: (path: string) => void;
}

function Modal({ isOpen, onClose, content, onProceed }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
            className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">
              {content?.title}
            </h2>
            {content?.image && (
              <div onClick={() => onProceed(content ? content.title : '')}>
                <img
                  src={content.image}
                  alt={content.title}
                  draggable="false"
                  className="w-full h-auto rounded mb-4 cursor-pointer select-none"
                />
              </div>
            )}

            <div className="text-gray-300 mb-4">{content?.details}</div>
            <div className="flex justify-between mt-6">
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Close
              </button>
              <button
                onClick={() => onProceed(content ? content.title : '')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Check
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ShimmerCards() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const navigate = useNavigate();

  const openModal = (card: Card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const proceedToScene = (title: string) => {
    if (title === '3D Game') {
      navigate('/game');
    } else if (title === 'Solar System') {
      navigate('/space');
    } else if (title === 'Learning Planet') {
      navigate('/learning');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 lg:w-1/2 max-w-6xl mx-auto">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-gray-900 p-6 group h-full cursor-pointer"
          onClick={() => openModal(card)}
        >
          <div>
            <div className="flex items-center mb-2">
              {card.icon}
              <h3 className="text-xl font-semibold text-white ml-2">
                {card.title}
              </h3>
            </div>
            <p className="text-gray-400 mb-4">{card.description}</p>
          </div>
          <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-auto">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 bg-[length:200%_100%] animate-shimmer"></div>
        </div>
      ))}
      <Modal
        isOpen={selectedCard !== null}
        onClose={closeModal}
        content={selectedCard}
        onProceed={proceedToScene}
      />
    </div>
  );
}
