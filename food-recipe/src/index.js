import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Random from './components/Random';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './components/Main';
import Recipes from './components/Recipe';
import Recipe from './components/Recipe-test';
import LikePage from './components/LikePage';
import Ingredient from './components/Ingredient';
import Rank from './components/Rank';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/random" element={<Random />} />
        <Route path="/recipes" element={<Recipes/>} />
        <Route path="/recipe" element={<Recipe/>} />
        <Route path="/like_page" element={<LikePage />} />
        <Route path="/ingredient" element={<Ingredient />} />
        <Route path="/rank" element={<Rank />} />
      </Routes>
    </Router>
  </React.StrictMode>
);