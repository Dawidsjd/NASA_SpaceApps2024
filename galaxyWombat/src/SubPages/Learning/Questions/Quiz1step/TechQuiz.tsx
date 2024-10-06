import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { techQuestions } from '../../QuestionData'; 

interface AnswerState {
  text: string;
  isCorrect: boolean;
}

const TechQuiz = () => {
  const location = useLocation();
  const { planet } = location.state || {};

  const questions = techQuestions[planet.label]; 

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerState | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!questions) {
    return <div>Brak pytań dla wybranej planety w tej kategorii.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer: { text: string; isCorrect: boolean }) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="text-white text-3xl mb-4">Quiz Technologiczny o {planet.label}</h1>
      <p className="text-white text-xl">{currentQuestion.question}</p>
      <div className="answers mt-4">
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)} 
            className="block bg-blue-500 text-white p-2 rounded mb-2"
          >
            {answer.text}
          </button>
        ))}
      </div>
      {showResult && (
        <div className={`mt-4 text-xl ${selectedAnswer?.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {selectedAnswer?.isCorrect ? 'Poprawna odpowiedź!' : 'Błędna odpowiedź!'}
        </div>
      )}
      {showResult && currentQuestionIndex < questions.length - 1 && (
        <button onClick={handleNextQuestion} className="block bg-green-500 text-white p-2 rounded mt-4">
          Następne pytanie
        </button>
      )}
    </div>
  );
};

export default TechQuiz;
