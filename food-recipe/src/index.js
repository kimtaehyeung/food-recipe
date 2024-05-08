// src/index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Random from './components/Random';
import Main from './components/Main';
import Rank from './components/Rank';
import Recipe from './components/RecipeTest';
import LikePage from './components/LikePage';
import UserRecipe from './components/UserRecipe';
import EditRecipe from './components/EditPage';
import Ingredient from './components/Ingredient';
import RecipeTest from './components/RecipeTest';
import DataContext from './context/DataContext'; // DataContext import하기

// App 컴포넌트 안에서 useState와 useEffect를 사용
const App = () => {
  const [data, setData] = useState([]); // 상태 관리를 위한 Hooks

  const [api_key, setApi_key] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    return () => {
      fetch("/api-key.txt").then(response => response.text())
        .then(d => {
          setApi_key(d)
          return d
        })
        .then((api) => setUrl(`http://openapi.foodsafetykorea.go.kr/api/${api}/COOKRCP01/json/1/100/`));
    };
  }, []);
  // RCP_NM="새우 두부 계란찜"
  console.log(api_key);
  console.log(url);
  // const url = `http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/1`;

  // const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
      return setData(data.COOKRCP01.row);
    }).catch(error => console.log("Fetching Error"));

  }, [api_key]);

  return (
    <DataContext.Provider value={data}>
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
    </DataContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);