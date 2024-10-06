import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import react-router
import ShimmerCards from './SubPages/Menu/components/ShimmerCards'; // Import komponentu ShimmerCards
import Scene from './SubPages/Galaxy/Scene'; // Import komponentu Scene
import StartLayout from './SubPages/Menu/StartLayout';
import SpaceGameMain from './SubPages/SpaceGame/SpaceGameMain';
import ExercisesPage from './SubPages/Learning/Exercises/ExercisesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartLayout />} />
        <Route path="/space" element={<Scene />} />
        <Route path="/game" element={<SpaceGameMain />} />
        <Route path="/learning" element={<ExercisesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
