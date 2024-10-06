import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import wombat_result from "../../../assets/wombat_result.png"

const ResultStepQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctCount, incorrectCount, planet } = location.state || { correctCount: 0, incorrectCount: 0, total: 0 };

  return (
    <div className="result-container p-4 mx-auto h-[100vh] flex justify-center items-center w-full bg-gray-800 text-center rounded-md">
      <div className='w-[65%] h-[35vh] flex flex-col justify-between'>
        <div>
          <h1 className="text-white text-4xl mb-10 font-bold tracking-[2px]">Twój wynik!</h1>
          <div className='flex flex-col items-center mb-10'>
            <p className="text-3xl text-green-500 font-semibold mb-4">Poprawne odpowiedzi: {correctCount}</p>
            <p className="text-3xl text-red-500 font-semibold mb-4">Błędne odpowiedzi: {incorrectCount}</p>
          </div>
        </div>

        {/* <div className='text-[#374151] bg-[#374151] h-[5px] rounded-md mb-6' /> */}
        <img src={wombat_result} className='womat_resultImage' alt="" />

        <div className='mt-1 flex justify-center'>
          <button
            className="p-4 rounded-full border-2 border-gray-700 border-b-[4px] inline-flex items-center justify-center bg-gray-700 text-white hover:bg-gray-600 hover:border-gray-500 active:border-b-2 active:translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-all duration-100"
            onClick={() => {
              navigate('/learning/exercise', { state: { planet } });
            }}
          >
            Powrót do ćwiczeń
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultStepQuiz;
