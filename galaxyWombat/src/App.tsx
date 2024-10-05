import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Witaj w moim projekcie!</h1>
        <p className="text-lg">To jest przykładowa aplikacja z Tailwind CSS</p>
      </header>

      <main className="flex flex-col items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Kliknij mnie
        </button>
      </main>
    </div>
  );
};

export default App;
