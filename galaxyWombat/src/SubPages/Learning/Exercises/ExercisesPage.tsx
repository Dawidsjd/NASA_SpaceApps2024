import React from 'react';
import { useLocation } from 'react-router-dom';  // Hook do pobierania stanu z nawigacji
import { FaBook, FaPowerOff, FaWind, FaSun, FaDumbbell, FaOpencart } from 'react-icons/fa';
import DuolingoButton from './ui/DuolingoButton';
import { Link } from 'react-router-dom';

const ExercisesPage = () => {
  const location = useLocation();  // Pobieranie stanu przekazanego z nawigacji
  const { planet } = location.state || {};  // Pobranie danych planety

  return (
    <div className="bg-[#202937] h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-4xl font-bold mb-10">Learning Planet</h1>

        {/* Wyświetlanie grafiki planety */}
        {planet && (
          <div className="mb-10">
            <img src={planet.image} alt={planet.label} className="absolute top-1/3 left-[15%] w-96 h-auto object-contain" />
            <h2 className="absolute top-1/2 right-[15%] text-2xl mt-4 font-bold text-center tracking-wider z-10 text-white" style={{
              letterSpacing: '8px',
              textShadow: '2px 2px 5px #3b82f6',
              fontSize: '5rem',
            }}>{planet.label}</h2>
          </div>
        )}

        <div>
          <div>
            <Link to="/learning/exercise/techQuiz" state={{ planet }}>
              <DuolingoButton icon={<FaPowerOff size={32} className="text-white" />} />
            </Link>
          </div>
          <div className="ml-32">
            <Link to="/book-quiz" state={{ planet }}>
              <DuolingoButton icon={<FaBook size={32} className="text-white" />} />
            </Link>
          </div>
          <div className="ml-64">
            <Link to="/wind-quiz" state={{ planet }}>
              <DuolingoButton icon={<FaWind size={32} className="text-white" />} />
            </Link>
          </div>
          <div className="ml-40">
            <Link to="/sun-quiz" state={{ planet }}>
              <DuolingoButton icon={<FaSun size={32} className="text-white" />} />
            </Link>
          </div>
          <div className="ml-8">
            <Link to="/dumbbell-quiz" state={{ planet }}>
              <DuolingoButton icon={<FaDumbbell size={32} className="text-white" />} />
            </Link>
          </div>
          <div className="-ml-24">
            <Link to="/cart-quiz" state={{ planet }}>
              <DuolingoButton icon={<FaOpencart size={32} className="text-white" />} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
