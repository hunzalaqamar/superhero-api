# Superhero API

## Overview

Superhero API is a simple Node.js application built with Express that allows users to add new superheroes and fetch a list of superheroes sorted by their humility score in descending order. The API uses an in-memory array as its data store for simplicity.

## Features

- **POST /superheroes**: Add a new superhero with a name, superpower, and a humility score (1-10). The humility score is validated to be a number between 1 and 10.
- **GET /superheroes**: Retrieve the list of superheroes sorted by their humility score in descending order.
- Basic error handling and input validation.
- Unit tests written with Jest and Supertest.

## Technologies Used

- Node.js
- Express.js
- Jest and Supertest for testing
- CORS

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hunzalaqamar/superhero-api.git
   ```
