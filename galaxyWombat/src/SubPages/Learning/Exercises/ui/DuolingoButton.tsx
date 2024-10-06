import React from 'react';

interface DuolingoButtonProps {
  icon: JSX.Element;  // Definiujemy, że przycisk oczekuje ikony jako elementu JSX
}

const DuolingoButton= ({ icon }: DuolingoButtonProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-fit mx-auto mb-3">
      <button 
        className="rounded-full border-2 border-gray-700 border-b-[6px] m-2.5 inline-flex items-center justify-center p-6 transition-all duration-100 hover:bg-gray-800 hover:border-gray-600 active:border-b-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 active:translate-y-[4px] z-50"
        aria-label="Duolingo button"
      >
        {icon}  {/* Wyświetlamy ikonę na środku przycisku */}
      </button>
    </div>
  );
}

export default DuolingoButton;
