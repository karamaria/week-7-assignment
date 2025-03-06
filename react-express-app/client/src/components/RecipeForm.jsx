import { useState } from "react";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cook_time, setCookTime] = useState("");
  const [description, setDescription] = useState("");
  const [img_url, setImgUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      title,
      author,
      cook_time,
      description,
      img_url
    };

    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Recipe added:', data);
      } else {
        throw new Error('Error submitting the form');
      }
    } catch (err) {
      console.error('Error during submission:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Author" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Cook Time (min)" 
        value={cook_time} 
        onChange={(e) => setCookTime(e.target.value)} 
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <input 
        type="url" 
        placeholder="Image URL" 
        value={img_url} 
        onChange={(e) => setImgUrl(e.target.value)} 
      />
      <button type="submit">Add New Recipe</button>
    </form>
  );
};

export default RecipeForm;