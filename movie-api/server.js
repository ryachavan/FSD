import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let nextId = 4;

let movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 3, recommended: "Yes" },
  { id: 2, title: "Titanic", genre: "Romance", rating: 4, recommended: "Yes" },
  { id: 3, title: "The Dark Knight", genre: "Action", rating: 5, recommended: "Yes" },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 5, recommended: "Yes" },
  { id: 5, title: "3 Idiots", genre: "Comedy/Drama", rating: 3, recommended: "Yes" }
];

// GET
app.get("/movies", (req, res) => {
  const { rating } = req.query;

  if (rating) {
    const filtered = movies.filter(
      m => m.rating === parseInt(rating)
    );
    return res.json(filtered);
  }

  res.json(movies);
});

// POST
app.post("/movies", (req, res) => {
  const { title, genre, rating, recommended } = req.body;

  if (!title || !genre || !rating || !recommended) {
    return res.status(400).json({ error: "All fields required" });
  }

  const newMovie = {
    id: nextId++,
    title,
    genre,
    rating: parseInt(rating),
    recommended
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// PATCH
app.patch("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  const { title, genre, rating, recommended } = req.body;

  if (title) movie.title = title;
  if (genre) movie.genre = genre;
  if (rating) movie.rating = parseInt(rating);
  if (recommended) movie.recommended = recommended;

  res.json(movie);
});

// DELETE
app.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  movies = movies.filter(m => m.id !== id);
  res.json({ message: "Deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});