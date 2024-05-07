import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Random from './components/Random';
import Main from './components/Main';
import Rank from './components/Rank';
import Recipe from './components/Recipe';
import LikePage from './components/LikePage';
import UserRecipe from './components/UserRecipe';
import EditRecipe from './components/EditPage';
import Ingredient from './components/Ingredient';
import RecipeTest from './components/RecipeTest';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/random" element={<Random />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/user_recipe" element={<UserRecipe />} />
        <Route path="/edit_recipe" element={<EditRecipe />} />
        <Route path="/like_page" element={<LikePage />} />
        <Route path="/ingredient" element={<Ingredient />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/recipe-test" element={<RecipeTest />} />
      </Routes>
    </Router>
  </React.StrictMode>
);