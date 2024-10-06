import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultStepQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctCount, incorrectCount, total, planet } = location.state || { correctCount: 0, incorrectCount: 0, total: 0 };

  return (
    <div className="result-container h-screen flex flex-col justify-center items-center bg-[#202937]">
      <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-4xl text-white font-bold mb-6">Twój wynik!</h1>
        <p className="text-2xl text-green-500 mb-4">Poprawne odpowiedzi: {correctCount}</p>
        <p className="text-2xl text-red-500 mb-4">Błędne odpowiedzi: {incorrectCount}</p>
        <p className="text-2xl text-white mb-6">Razem: {total}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
          onClick={() => {
            navigate('/learning/exercise', { state: { planet } });
          }}
        >
          Powrót do ćwiczeń
        </button>
      </div>
    </div>
  );
};

export default ResultStepQuiz;
