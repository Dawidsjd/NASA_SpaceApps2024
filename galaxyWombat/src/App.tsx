import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import react-router
import ShimmerCards from './SubPages/Menu/components/ShimmerCards'; // Import komponentu ShimmerCards
import Scene from './SubPages/Galaxy/Scene'; // Import komponentu Scene
import StartLayout from './SubPages/Menu/StartLayout';
import SpaceGameMain from './SubPages/SpaceGame/SpaceGameMain';
import LearningHomePage from './SubPages/Learning/HomePage/LearningHomePage';
import ExercisesPage from './SubPages/Learning/Exercises/ExercisesPage';
import TechQuiz from './SubPages/Learning/Questions/Quiz1step/TechQuiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartLayout />} />
        <Route path="/space" element={<Scene />} />
        <Route path="/game" element={<SpaceGameMain />} />
        <Route path="/learning" element={<LearningHomePage />} />
        <Route path="/learning/exercise" element={<ExercisesPage />} />
        <Route path="/learning/exercise/techQuiz" element={<TechQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
