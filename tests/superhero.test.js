// tests/superhero.test.js
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

let superheroes = [];

// We need to re-declare our endpoints for testing purposes.
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

describe("Superhero API Endpoints", () => {
  // Reset the in-memory database before each test.
  beforeEach(() => {
    superheroes = [];
  });

  test("POST /superheroes - success", async () => {
    const response = await request(app).post("/superheroes").send({
      name: "Batman",
      superpower: "Intelligence",
      humility: 7,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Batman");
  });

  test("GET /superheroes - returns sorted superheroes", async () => {
    // Add two superheroes
    await request(app)
      .post("/superheroes")
      .send({ name: "Superman", superpower: "Strength", humility: 8 });
    await request(app)
      .post("/superheroes")
      .send({ name: "Spiderman", superpower: "Agility", humility: 6 });

    const response = await request(app).get("/superheroes");
    expect(response.statusCode).toBe(200);
    // Check that the first superhero has the higher humility score
    expect(response.body[0].humility).toBeGreaterThanOrEqual(
      response.body[1].humility
    );
  });
});
