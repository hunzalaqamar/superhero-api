const express = require("express");
const cors = require("cors");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

let superheroes = [];

app.post("/superheroes", (req, res) => {
  const { name, superpower, humility } = req.body;

  if (!name || !superpower || humility === undefined) {
    return res.status(400).json({
      error: "Name, superpower, and humility score are required.",
    });
  }

  const humilityNum = Number(humility);
  if (isNaN(humilityNum) || humilityNum < 1 || humilityNum > 10) {
    return res.status(400).json({
      error: "Humility score must be a number between 1 and 10.",
    });
  }

  const superhero = {
    id: superheroes.length + 1,
    name,
    superpower,
    humility: humilityNum,
  };
  superheroes.push(superhero);
  res.status(201).json(superhero);
});

app.get("/superheroes", (req, res) => {
  const sortedHeroes = [...superheroes].sort((a, b) => b.humility - a.humility);
  res.json(sortedHeroes);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
