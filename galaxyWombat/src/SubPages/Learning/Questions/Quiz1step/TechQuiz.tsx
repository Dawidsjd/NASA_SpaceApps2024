import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { techQuestions } from '../../QuestionData';
import { IoIosArrowBack } from 'react-icons/io';
import wombatQuestionImage from '../../../../assets/wombatQuestions.png';

interface AnswerState {
  text: string;
  isCorrect: boolean;
}

const TechQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { planet } = location.state || {};

  // Pobranie pytań dla danej planety, jeśli brak pytań ustaw pustą tablicę
  const questions = planet?.label ? techQuestions[planet.label] ?? [] : [];

  // Stany quizu
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerState | null>(
    null
  );
  const [disabledAnswers, setDisabledAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  // Resetowanie quizu za każdym razem, gdy użytkownik wraca do strony quizu
  useEffect(() => {
    // Funkcja do resetowania stanu quizu
    const resetQuiz = () => {
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setDisabledAnswers([]);
      setShowResult(false);
      setCorrectCount(0);
      setIncorrectCount(0);
    };

    // Nasłuchiwanie nawigacji powrotnej
    resetQuiz();
  }, [location.state]); // Użycie location.state nasłuchuje zmianę stanu planety, co resetuje quiz

  const handleAnswerClick = (
    answer: { text: string; isCorrect: boolean },
    index: number
  ) => {
    if (disabledAnswers.includes(index)) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    // Używamy funkcji aktualizacji, aby poprawnie zliczać odpowiedzi na podstawie poprzedniego stanu
    if (answer.isCorrect) {
      setCorrectCount((prevCount) => prevCount + 1); // Zwiększ liczbę poprawnych odpowiedzi
    } else {
      setIncorrectCount((prevCount) => prevCount + 1); // Zwiększ liczbę błędnych odpowiedzi
      setDisabledAnswers([...disabledAnswers, index]); // Odpowiedź staje się wyłączona
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setDisabledAnswers([]);

    // Sprawdzamy, czy to było ostatnie pytanie
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Przekazujemy najnowsze wartości licznika dopiero po zakończeniu quizu
      navigate('/learning/exercise/result-step-quiz', {
        state: {
          correctCount,
          incorrectCount,
          total: questions.length,
          planet,
        },
      });
    }
  };

  // Jeśli brak pytań, wyświetl komunikat
  if (questions.length === 0) {
    return <div>No questions for the selected planet in this category.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container p-4 mx-auto h-[100vh] flex justify-center items-center w-full bg-gray-800 text-center rounded-md">
      <div className="w-[65%] h-[55vh] flex flex-col justify-between">
        <div>
          <h1 className="text-white text-4xl mb-10 font-bold tracking-[2px]">
            Technology Quiz about {planet?.label}
          </h1>
          <div className="flex items-center mb-10">
            <img src={wombatQuestionImage} alt="" className="max-w-[125px]" />

            <div className="flex justify-center items-center">
              <div className="custom_border">
                <div className="arrow-icon-wrapper">
                  <IoIosArrowBack className="arrow-icon" />
                </div>
                <p className="text-white text-xl">{currentQuestion.question}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#374151] bg-[#374151] h-[5px] rounded-md" />

        <div className="mt-1">
          <div className="answers mt-4">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer, index)}
                className={`w-full p-4 mb-2.5 rounded-full border-2 border-gray-700 border-b-[4px] inline-flex items-center justify-center transition-all duration-100 text-lg ${
                  disabledAnswers.includes(index)
                    ? 'bg-gray-400 text-gray-800 cursor-not-allowed' // Disabled style
                    : 'bg-gray-700 text-white hover:bg-gray-600 hover:border-gray-500 active:border-b-2 active:translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50' // Active/Enabled style
                }`}
                disabled={disabledAnswers.includes(index)}
              >
                {answer.text}
              </button>
            ))}
          </div>
          {showResult && selectedAnswer && !selectedAnswer.isCorrect && (
            <div className="mt-4 text-xl text-red-500">
              Wrong answer! Try again.
            </div>
          )}
          {showResult && selectedAnswer && selectedAnswer.isCorrect && (
            <button
              onClick={handleNextQuestion}
              className="block w-full mt-4 bg-green-500 text-white p-4 rounded-full border-2 border-gray-700 border-b-[4px] hover:bg-green-600 hover:border-green-500 active:border-b-2 active:translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            >
              {currentQuestionIndex < questions.length - 1
                ? 'Next question'
                : 'Finish'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechQuiz;
