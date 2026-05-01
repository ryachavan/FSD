import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://v2.jokeapi.dev/joke/Programming?safe-mode&type=single"
    );

    const jokeText = response.data.joke;

    res.render("index", { joke: jokeText });

  } catch (error) {
    console.error(error.message);

    res.render("index", {
      joke: "Unable to fetch joke. Please try again."
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});