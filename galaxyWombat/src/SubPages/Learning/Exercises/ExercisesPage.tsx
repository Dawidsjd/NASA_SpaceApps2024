import React from 'react';
import { Link, useLocation } from 'react-router-dom';  
import { FaBook, FaPowerOff, FaWind, FaSun, FaDumbbell, FaOpencart, FaRocket, FaArrowLeft } from 'react-icons/fa';  // Import nowej ikony
import DuolingoButton from './ui/DuolingoButton';
import { Link } from 'react-router-dom';

const ExercisesPage = () => {
  const location = useLocation();  
  const { planet } = location.state || {};  

  return (
    <div className="bg-[#202937] h-screen w-full flex items-center justify-center overflow-hidden relative">

         {/* Dodanie przycisku cofania w lewym górnym rogu */}
      <div className="absolute top-6 left-6">
        <Link to="/learning" className=" text-white text-lg rounded-full border-2 border-gray-700 border-b-[6px] m-2.5 inline-flex items-center justify-center px-6 py-3 transition-all duration-100 hover:bg-gray-800 hover:border-gray-600 active:border-b-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 active:translate-y-[4px] opacity-65 hover:opacity-100 z-50">
          <FaArrowLeft className="mr-2" /> Back
        </Link>
      </div>
      
         {/* Dodanie obrazka w prawym górnym rogu */}
         <div className="absolute top-6 right-6">
        <img src="/assets/icon-dark.png" alt="Icon" draggable='false' className="w-24 h-auto select-none opacity-25" />  {/* Wstawienie obrazka */}
      </div>
      
      <div className="flex flex-col items-center ">
        <h1 className="text-white text-5xl font-bold mb-10" style={{
          letterSpacing: '8px',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
        }}>Learning Planet</h1>

        {/* Wyświetlanie grafiki planety */}
        {planet && (
<<<<<<< HEAD
          <div className="mb-10">
            <img src={planet.image} alt={planet.label} className="absolute top-1/3 left-[15%] w-96 h-auto object-contain" />
            <h2 className="absolute top-1/2 right-[15%] text-2xl mt-4 font-bold text-center tracking-wider z-10 text-white" style={{
              letterSpacing: '8px',
              textShadow: '2px 2px 5px #3b82f6',
              fontSize: '5rem',
            }}>{planet.label}</h2>
=======
          <div className="mb-10 absolute top-1/4 left-[15%]">
            <img src={planet.image} alt={planet.label} className=" w-96 h-auto object-contain  mb-10" style={{
                filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))'
            }}/>
            
            <h2 className=" text-2xl mt-4 font-bold text-center tracking-wider z-10 text-white" style={{
              letterSpacing: '8px',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
              fontSize: '5rem',
            }}>{planet.label}</h2>
            
>>>>>>> main
          </div>
        )}

        <img 
          src={'/assets/wombat-pixel.png'} 
          alt={planet?.label} 
          className="fixed top-1/4 right-0 w-1/2 h-auto object-contain mb-10 opacity-5 select-none" 
          draggable='false'
          style={{
              filter: 'grayscale(100%) drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))'
          }}
        />

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
