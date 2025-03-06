import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/Home";
import RecipesPage from "./pages/RecipesPage";
import RecipePage from "./pages/RecipePage";
import RecipeForm from "./components/RecipeForm";
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="navbar">
        <a href="/">Home</a>
        <a href="/recipes">Recipes</a>
      </div>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/add-recipe" element={<RecipeForm className="recipe-form" />} />
      </Routes>
    </Router>
  );
}