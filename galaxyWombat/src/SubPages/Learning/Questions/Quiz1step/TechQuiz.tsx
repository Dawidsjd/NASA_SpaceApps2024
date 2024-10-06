import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { techQuestions } from '../../QuestionData'; 

interface AnswerState {
  text: string;
  isCorrect: boolean;
}

const TechQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { planet } = location.state || {};

  const questions = techQuestions[planet.label]; // Pobieramy pytania dla danej planety

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerState | null>(null);
  const [disabledAnswers, setDisabledAnswers] = useState<number[]>([]); // Śledzenie indeksów zablokowanych odpowiedzi
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  if (!questions) {
    return <div>Brak pytań dla wybranej planety w tej kategorii.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer: { text: string; isCorrect: boolean }, index: number) => {
    if (disabledAnswers.includes(index)) return; // Jeśli odpowiedź już została zaznaczona, nie rób nic

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer.isCorrect) {
      setCorrectCount(correctCount + 1);
      handleNextQuestion(); // Jeśli odpowiedź jest poprawna, przejdź do następnego pytania
    } else {
      setIncorrectCount(incorrectCount + 1);
      setDisabledAnswers([...disabledAnswers, index]); // Dodaj indeks błędnej odpowiedzi do zablokowanych
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setDisabledAnswers([]); // Resetuj zablokowane odpowiedzi

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/learning/exercise/result-step-quiz', { state: { correctCount, incorrectCount, total: questions.length } });
    }
  };

  return (
    <div className="quiz-container p-4 max-w-lg mx-auto bg-gray-800 text-center rounded-md">
      <h1 className="text-white text-3xl mb-4">Quiz Technologiczny o {planet.label}</h1>
      <p className="text-white text-xl mb-6">{currentQuestion.question}</p>
      <div className="answers mt-4">
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer, index)}
            className={`block w-full p-2 mb-2 rounded ${
              disabledAnswers.includes(index) ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-blue-500 text-white'
            }`}
            disabled={disabledAnswers.includes(index)} // Zablokowanie błędnej odpowiedzi
          >
            {answer.text}
          </button>
        ))}
      </div>
      {showResult && selectedAnswer && !selectedAnswer.isCorrect && (
        <div className="mt-4 text-xl text-red-500">
          Błędna odpowiedź! Spróbuj jeszcze raz.
        </div>
      )}
      {showResult && selectedAnswer && selectedAnswer.isCorrect && (
        <button onClick={handleNextQuestion} className="block w-full mt-4 bg-green-500 text-white p-2 rounded">
          {currentQuestionIndex < questions.length - 1 ? 'Następne pytanie' : 'Zakończ quiz'}
        </button>
      )}
    </div>
  );
};

export default TechQuiz;
