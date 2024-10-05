import { useState } from "react";
import { ArrowRight, Cuboid, Globe, Telescope, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // Import z react-router-dom
import Scene from "../../Galaxy/Scene";

interface Card {
  title: string;
  description: string;
  icon: JSX.Element;
  details: string;
  image: string;
}

const cards: Card[] = [
  {
    title: "3D Game",
    description: "Zanurz się w interaktywnym świecie gier 3D, gdzie możesz eksplorować różnorodne poziomy i wyzwania.",
    icon: <Cuboid className="h-6 w-6 text-blue-400" />,
    details: "Nasze 3D Game to immersyjne doświadczenie, które przenosi graczy do fascynującego świata pełnego przygód. Wykorzystując najnowsze technologie graficzne, oferujemy realistyczne środowiska i płynną rozgrywkę. Gracze mogą tworzyć własne postacie, rozwijać umiejętności i współpracować z innymi w trybie wieloosobowym. Regularnie dodajemy nowe poziomy, wyzwania i elementy fabularne, aby zapewnić długotrwałą rozrywkę.",
    image: "/assets/webGame.png",
  },
  {
    title: "Solar System",
    description: "Odkryj tajemnice Układu Słonecznego i poznaj planety, które go tworzą.",
    icon: <Globe className="h-6 w-6 text-blue-400" />,
    details: "Nasza aplikacja Solar System to interaktywny przewodnik po Układzie Słonecznym. Użytkownicy mogą eksplorować szczegółowe modele 3D planet, księżyców i innych ciał niebieskich. Oferujemy aktualne dane astronomiczne, ciekawostki o każdym obiekcie oraz symulacje orbit i faz księżyca. Aplikacja zawiera również sekcję edukacyjną z quizami i wyzwaniami, idealnymi dla uczniów i entuzjastów astronomii.",
    image: "/assets/spaceSystem.png",
  },
  {
    title: "Stellarium",
    description: "Stellarium to symulator nieba, który pozwala na obserwację gwiazd, planet...",
    icon: <Telescope className="h-6 w-6 text-blue-400" />,
    details: "Stellarium to zaawansowany symulator nieba, który przynosi kosmos na wyciągnięcie ręki. Oferuje realistyczne odwzorowanie nieba z ponad 600 000 gwiazd, planetami, mgławicami i galaktykami. Użytkownicy mogą obserwować niebo z dowolnego miejsca na Ziemi i w dowolnym czasie. Aplikacja zawiera szczegółowe informacje o obiektach astronomicznych, umożliwia śledzenie sztucznych satelitów i oferuje narzędzia do planowania obserwacji astronomicznych.",
    image: "/path/to/image3.jpg",
  },
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: Card | null;
  onProceed: () => void;
}

function Modal({ isOpen, onClose, content, onProceed }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Zamknij"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">{content?.title}</h2>
            {/* Wyświetlanie obrazu */}
            {content?.image && (
              <img src={content.image} alt={content.title} className="w-full h-auto rounded mb-4" />
            )}
            <div className="text-gray-300 mb-4">{content?.details}</div>
            <div className="flex justify-between mt-6">
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Zamknij
              </button>
              <button
                onClick={onProceed}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Przejdź dalej
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
  const navigate = useNavigate(); // Używamy hooka useNavigate do nawigacji

  const openModal = (card: Card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const proceedToScene = () => {
    navigate("/scene"); // Przekierowanie na stronę z komponentem Scene
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-1/2 max-w-6xl mx-auto">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-gray-900 p-6 group h-full cursor-pointer"
          onClick={() => openModal(card)}
        >
          <div>
            <div className="flex items-center mb-2">
              {card.icon}
              <h3 className="text-xl font-semibold text-white ml-2">{card.title}</h3>
            </div>
            <p className="text-gray-400 mb-4">{card.description}</p>
          </div>
          <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-auto">
            Dowiedz się więcej <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 bg-[length:200%_100%] animate-shimmer"></div>
        </div>
      ))}
      <Modal
        isOpen={selectedCard !== null}
        onClose={closeModal}
        content={selectedCard}
        onProceed={proceedToScene} // Przekazanie funkcji nawigacji do Modal
      />
    </div>
  );
}