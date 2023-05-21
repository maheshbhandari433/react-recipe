import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FetchCountryFlag from './FetchCountryFlag'

import '../App.css'

const RecipeDetails = ({ recipes }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [flagUrl, setFlagUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Find the recipe with the provided ID
        const selectedRecipe = recipes.find(recipe => recipe.id === parseInt(id));

        if (selectedRecipe && selectedRecipe.country) {
          setRecipe(selectedRecipe);

            // Fetch country flag using the country name
            const flagUrl = await FetchCountryFlag(selectedRecipe.country);
            setFlagUrl(flagUrl);
          }
         else {
          console.error('Recipe not found');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Error fetching recipe');
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id, recipes]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const { name, author, country, description, ingredients, instructions, image } = recipe;

  return (
    <div className="container">
      <h2 className="my-4">{name}</h2>
      <div className="row">
      <div className="col-lg-4 position-relative">
  <img src={image} className="img-fluid recipe-image" alt={name} />
  {flagUrl && (
    <img src={flagUrl} alt={`${country} flag`} className="flag-icon" />
  )}
</div>
        <div className="col-lg-8">
          <h4 className="py-3">Recipe Details</h4>
          <p>Author: {author}</p>
          <p>Country: {country}</p>
          <p>Description: {description}</p>
          <p>Instructions: {instructions}</p>

          <h4>Ingredients</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name} - {ingredient.amount}</li>
        ))}
      </ul>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;






