import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import FetchCountryFlag from '../components/FetchCountryFlag';

import '../App.css'
import { Navbar, Nav } from 'react-bootstrap';


const Home = () => {
  const [latestRecipes, setLatestRecipes] = useState([]);

  const fetchLatestRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3001/recipes');
      const data = await response.json();
      const sortedRecipes = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setLatestRecipes(sortedRecipes.slice(0, 4));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchLatestRecipes();
  }, []);

   const fetchFlagUrl = async (countryName) => {
    try {
      const flagUrl = await FetchCountryFlag(countryName);
      return flagUrl;
    } catch (error) {
      console.error('Error fetching country flag:', error);
    }
    return null;
  };

  useEffect(() => {
    const fetchFlagUrls = async () => {
      const updatedRecipes = [];
      for (const recipe of latestRecipes) {
        const flagUrl = await fetchFlagUrl(recipe.country);
        updatedRecipes.push({ ...recipe, flagUrl });
      }
      setLatestRecipes(updatedRecipes);
    };
  
    fetchFlagUrls();
  }, []); // Remove 'latestRecipes' from the dependency array
  
  
   

  return (
    <div>
{/* Navigation links */}
<Navbar bg="light" expand="lg">
  <div className="container">
    <Navbar.Brand href="/">Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarNav" />
    <Navbar.Collapse id="navbarNav">
      <Nav className="ml-auto">
        <Nav.Link href="/recipes">Recipes</Nav.Link>
        <Nav.Link href="/add">Add Recipe</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </div>
</Navbar>

      {/* Cover video */}
      <div className="cover-video">
  <video id="banner-video" autoPlay muted loop>
    <source src="pexels-los-muertos-crew-8279561-1080x1920-24fps.mp4" type="video/mp4" />
  </video>
  <div className="banner-text">
    <h1>Welcome to Recipe</h1>
    <p>Discover amazing recipes for every occasion</p>
  </div>
</div>


      {/* Latest recipes */}
      <div className="container">
  <h2 className="mt-4">Latest Recipes</h2>
  <div className="row">
    {latestRecipes.map(recipe => (
      <div className="col-md-6 col-lg-3 mb-4" key={recipe.id}>
        <div className="card h-100">
          
          <img
            src={recipe.image}
            className="card-img-top img-fluid position-relative"
            alt={recipe.name}
            style={{ width: '300px', height: '200px', objectFit: 'cover' }}
          />
           {recipe.flagUrl && (
                  <img
                    src={recipe.flagUrl}
                    alt={`${recipe.country} flag`}
                    className="card-img-flag"
                  />
                )} 
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <p className="card-text">{recipe.description}</p>


            {/*  "Details" button that links to the recipe details page */}
            <Link to={`/recipes/${recipe.id}`} className="btn btn-primary">Details</Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-4">
        <p>© 2023 Recipe. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;


