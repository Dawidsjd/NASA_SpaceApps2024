
import "../questionStyles.css"

import { Link, useLocation } from 'react-router-dom';  
import { FaBook, FaPowerOff, FaWind, FaSun, FaDumbbell, FaOpencart, FaArrowLeft } from 'react-icons/fa';  


import DuolingoButton from './ui/DuolingoButton';

const ExercisesPage = () => {
  const location = useLocation();
  const { planet } = location.state || {};

  return (
    <div className="bg-[#202937] h-screen w-full flex items-center justify-center overflow-hidden relative">
      <div className="absolute top-6 left-6">
        <Link
          to="/learning"
          className="flex items-center px-4 py-2  text-white rounded-lg opacity-70 hover:opacity-100"
        >
          <FaArrowLeft className="mr-2" /> Back
        </Link>
      </div>

      <div className="absolute top-6 right-6">
        <img
          src="/assets/icon-dark.png"
          alt="Icon"
          draggable="false"
          className="w-24 h-auto select-none opacity-25"
        />
      </div>

      <div className="flex flex-col items-center ">
        <h1
          className="text-white text-5xl font-bold mb-10"
          style={{
            letterSpacing: '8px',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
          }}
        >
          Learning Planet
        </h1>

        {planet && (
          <div className="mb-10 absolute top-1/4 left-[15%]">
            <img
              src={planet.image}
              alt={planet.label}
              className=" w-96 h-auto object-contain  mb-10"
              style={{
                filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))',
              }}
            />
            <h2
              className=" text-2xl mt-4 font-bold text-center tracking-wider z-10 text-white"
              style={{
                letterSpacing: '8px',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
                fontSize: '5rem',
              }}
            >
              {planet.label}
            </h2>
          </div>
        )}

        <img
          src={'/assets/wombat-pixel.png'}
          alt={planet?.label}
          className="fixed top-1/4 right-0 w-1/2 h-auto object-contain mb-10 opacity-5 select-none"
          draggable="false"
          style={{
            filter:
              'grayscale(100%) drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))',
          }}
        />

        <div>
          <div>
            <Link
              to="/learning/exercise/techQuiz"
              state={{ planet }}
              key={planet?.label}
            >
              <DuolingoButton
                icon={<FaPowerOff size={32} className="text-white" />}
              />
            </Link>
          </div>

          <div className="ml-32">
            <Link to="/book-quiz" state={{ planet }}>
              <DuolingoButton
                icon={<FaBook size={32} className="text-white" />}
              />
            </Link>
          </div>
          <div className="ml-64">
            <Link to="/wind-quiz" state={{ planet }}>
              <DuolingoButton
                icon={<FaWind size={32} className="text-white" />}
              />
            </Link>
          </div>
          <div className="ml-40">
            <Link to="/sun-quiz" state={{ planet }}>
              <DuolingoButton
                icon={<FaSun size={32} className="text-white" />}
              />
            </Link>
          </div>
          <div className="ml-8">
            <Link to="/dumbbell-quiz" state={{ planet }}>
              <DuolingoButton
                icon={<FaDumbbell size={32} className="text-white" />}
              />
            </Link>
          </div>
          <div className="-ml-24">
            <Link to="/cart-quiz" state={{ planet }}>
              <DuolingoButton
                icon={<FaOpencart size={32} className="text-white" />}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
