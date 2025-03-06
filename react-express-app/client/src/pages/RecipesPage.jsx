import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('https://week-7-assignment-7g3z.onrender.com/api/recipes')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  const handleLike = (id) => {
    fetch(`https://week-7-assignment-7g3z.onrender.com/api/recipes/${id}/like`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Recipe liked:', data);
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === id ? { ...recipe, likes: data.likes } : recipe
          )
        );
      })
      .catch((err) => console.error('Error liking recipe:', err));
  };

  const handleDelete = (id) => {
    fetch(`https://week-7-assignment-7g3z.onrender.com/api/recipes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        console.log('Recipe deleted');
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
      })
      .catch((err) => console.error('Error deleting recipe:', err));
  };

  return (
    <div>
      <h1>Recipes</h1>
        <RecipeForm setRecipes={setRecipes} />

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            <button onClick={() => handleDelete(recipe.id)}>❌</button>
            <button onClick={() => handleLike(recipe.id)}>❤️</button>
            <p>Likes: {recipe.likes || 0}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesPage;
