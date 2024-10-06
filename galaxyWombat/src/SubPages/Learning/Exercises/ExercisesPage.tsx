import React from 'react';
import { FaBook, FaPowerOff, FaWind, FaSun, FaDumbbell, FaOpencart } from 'react-icons/fa';  // Import ikon
import DuolingoButton from './ui/DuolingoButton';

const ExercisesPage = () => {
  return (
    <div className="bg-[#202937] h-screen w-full flex items-center justify-center">
      {/* Główna zawartość, w tym tytuł strony i przyciski */}
      <div className="flex flex-col items-center">
        {/* Tytuł strony */}
        <h1 className="text-white text-4xl font-bold mb-10">Learning Planet</h1>

        <div>

            {/* <img src="/assets/icon-dark.png" className='absolute top-1/4 left-0 w-1/2 h-auto opacity-5' /> */}
            
            



        <div>
        <DuolingoButton icon={<FaPowerOff size={32} className="text-white" />} />  
        </div>
        <div className='ml-32'>
        <DuolingoButton icon={<FaBook size={32} className="text-white" />} />  
        </div>
        <div className='ml-64'>
        <DuolingoButton icon={<FaWind size={32} className="text-white" />} />  
        </div>


        <div className='ml-40'>
        <DuolingoButton icon={<FaSun size={32} className="text-white" />} />     
        </div>
        <div className='ml-8'>
        <DuolingoButton icon={<FaDumbbell size={32} className="text-white" />} />  
        </div>
        <div className='-ml-24'>
        <DuolingoButton icon={<FaOpencart size={32} className="text-white" />} />  
        </div>


        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
