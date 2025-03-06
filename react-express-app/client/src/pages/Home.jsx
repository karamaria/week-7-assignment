import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Recipe World</h1>
      <p>Explore recipes from different regions and cuisines!</p>
      <Link to="/recipes">Go to Recipes</Link>
    
    </div>
  );
};

export default Home;