import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Проверка соединения с базой данных
pool.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));

// Миддлвары
app.use(cors());
app.use(express.json());

// 🟢 Получить все рецепты
app.get("/api/recipes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM recipes");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Получить один рецепт по ID
app.get("/api/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Добавить новый рецепт
app.post("/api/recipes", async (req, res) => {
  const { title, author, description, cook_time, img_url } = req.body;

  // Проверка, что все данные присутствуют
  if (!title || !author || !description || !cook_time || !img_url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO recipes (title, author, description, cook_time, img_url, likes) VALUES ($1, $2, $3, $4, $5, 0) RETURNING *",
      [title, author, description, cook_time, img_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error in POST /api/recipes:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Удалить рецепт
app.delete("/api/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM recipes WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Recipe deleted" });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (err) {
    console.error("Error in DELETE /api/recipes:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Добавить лайк к рецепту
app.post("/api/recipes/:id/like", async (req, res) => {
  const { id } = req.params;
  
  try {
    // Увеличиваем количество лайков для рецепта
    const result = await pool.query(
      "UPDATE recipes SET likes = likes + 1 WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); // Возвращаем обновленные данные рецепта
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (err) {
    console.error("Error liking recipe:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
