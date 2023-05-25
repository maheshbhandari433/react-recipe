import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddRecipe from './components/AddRecipe';
import RecipeList from './pages/RecipeList';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from the API or your db.json file
    fetch('http://localhost:3001/recipes')
      .then(response => response.json())
      .then(data => {
        setRecipes(data);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  const handleFormSubmit = (formData) => {
    fetch('http://localhost:3001/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        setRecipes(prevRecipes => [...prevRecipes, data]);
      })
      .catch(error => console.error('Error adding recipe:', error));
  };

  return (
    <div className="container">
      <Router>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipe onSubmit={handleFormSubmit}/>} />

          <Route path="/recipes/:id"
          element={<RecipeDetails recipes={recipes} />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;




