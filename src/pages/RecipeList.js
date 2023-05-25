import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch('http://localhost:3001/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error fetching recipes:', error));
  };

    return (
      <div>
         <h1 className="d-flex justify-content-center">Welcome to Recipes</h1>
        <div className="card-container">
          {recipes.map((recipe, index) => (
            <div className="card" key={index}>
              <img src={recipe.image} alt={recipe.name} className="card-img-top img-thumbnail" style={{ width: '300px', height: '300px' }} />
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.description}</p>
                {/* Additional recipe details */}
                 <Link to={`/recipes/${recipe.id}`} className="btn btn-primary"> 
                  Details
                </Link> 
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default RecipeList;


