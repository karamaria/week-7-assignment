import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error('Error fetching recipe details:', error));
  }, [id]);

  if (!recipe) {
    return <p>Loading</p>;
  }

  return (
    <div className="recipe-page">
      <h1>{recipe.title}</h1>
      <div className="recipe-content">
        <div className="recipe-image-container">
          <img src={recipe.img_url} alt={recipe.title} className="recipe-image" />
        </div>
        <div className="recipe-details">
          <p>{recipe.description}</p>
          <p><strong>Cook Time:</strong> {recipe.cook_time} minutes</p>
          <p><strong>Author:</strong> {recipe.author}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
