import { useLocation, useNavigate } from 'react-router-dom';
import wombat_excellent from '../../../assets/wombat_excellent.png';
import wombat_good from '../../../assets/wombat_good.png';
import wombat_average from '../../../assets/wombat_average.png';
import wombat_poor from '../../../assets/wombat_poor.png';

const ResultStepQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Wyświetl dane, które są przekazywane do komponentu
  console.log('Location state: ', location.state);

  // Odczytujemy stan z location.state z wartościami domyślnymi, jeśli nie zostaną przekazane
  const { correctCount = 0, incorrectCount = 0, planet } = location.state || {};

  const totalCount = correctCount + incorrectCount;
  const correctPercentage =
    totalCount > 0 ? (correctCount / totalCount) * 100 : 0;

  let resultMessage = '';
  let resultImage = wombat_poor;

  if (correctPercentage === 100) {
    resultMessage = 'Excellent result!';
    resultImage = wombat_excellent;
  } else if (correctPercentage >= 66) {
    resultMessage = 'Not bad!';
    resultImage = wombat_good;
  } else if (correctPercentage >= 33) {
    resultMessage = "Keep going, you're getting there!";
    resultImage = wombat_average;
  } else {
    resultMessage = 'Poor result, try again!';
    resultImage = wombat_poor;
  }

  return (
    <div className="result-container p-4 mx-auto h-[100vh] flex justify-center items-center w-full bg-gray-800 text-center rounded-md">
      <div className="w-[65%] h-4/5 flex flex-col justify-between items-center">
        <img src={resultImage} className="w-64 h-64" alt="Result Image" />
        <div>
          <h1 className="text-white text-4xl mb-10 font-bold tracking-[2px]">
            Your Result!
          </h1>
          <div className="flex flex-col items-center mb-10">
            <p className="text-3xl text-green-500 font-semibold mb-4">
              Correct Answers: {correctCount}
            </p>
            <p className="text-3xl text-red-500 font-semibold mb-4">
              Incorrect Answers: {incorrectCount}
            </p>
            <p className="text-2xl text-yellow-400 font-semibold mt-4">
              {resultMessage}
            </p>
          </div>
        </div>

        <div className="mt-1 flex justify-center">
          <button
            className="p-4 rounded-full border-2 border-gray-700 border-b-[4px] inline-flex items-center justify-center bg-gray-700 text-white hover:bg-gray-600 hover:border-gray-500 active:border-b-2 active:translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-all duration-100"
            onClick={() => {
              navigate('/learning/exercise', { state: { planet } });
            }}
          >
            Back to Exercises
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultStepQuiz;
