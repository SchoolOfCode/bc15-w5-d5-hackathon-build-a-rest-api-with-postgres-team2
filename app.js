// Import the required modules
import express from "express";
import morgan from "morgan";

// Import recipe-related helper functions
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipeById,
  deleteRecipeById,
} from "./recipes.js";

// Import book-related helper functions
import {
  getMethod,
  getMethodById,
  createMethod,
  updateMethodById,
  deleteMethodById,
} from "./how_to_make.js";

// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

// Middleware
app.use(morgan("dev")); // Morgan is used for logging HTTP requests to the console in a developer-friendly format
app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Recipe Route Handlers

// Endpoint to retrieve all recipes
app.get("/recipes/", async function (req, res) {
  const recipes = await getRecipes();
  res.status(200).json({ status: "success", data: recipes });
});

// Endpoint to retrieve a specific recipe by id
app.get("/recipes/:id", async function (req, res) {
  const id = req.params.id;
  const recipe = await getRecipeById(id);
  // Assume 404 status if the recipe is not found
  if (!recipe) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Recipe not found" } });
  }
  res.status(200).json({ status: "success", data: recipe });
});

// Endpoint to create a new recipe
app.post("/recipes/", async function (req, res) {
  const data = req.body;
  const recipe = await createRecipe(data);
  res.status(201).json({ status: "success", data: recipe });
});

// Endpoint to update a specific recipe by id
app.patch("/recipes/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  const recipe = await updateRecipeById(id, data);
  // Assume 404 status if the recipe is not found
  if (!recipe) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Recipe not found" } });
  }
  res.status(200).json({ status: "success", data: recipe });
});

// Endpoint to delete a specific recipe by id
app.delete("/recipes/:id", async function (req, res) {
  const id = req.params.id;
  const recipe = await deleteRecipeById(id);
  // Assume 404 status if the recipe is not found
  if (!recipe) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Recipe not found" } });
  }
  res.status(200).json({ status: "success", data: recipe });
});

// Method Route Handlers

// Endpoint to retrieve all method
app.get("/method/", async function (req, res) {
  const method = await getMethod();
  res.status(200).json({ status: "success", data: method });
});

// Endpoint to retrieve a specific book by id
app.get("/method/:id", async function (req, res) {
  const id = req.params.id;
  const book = await getMethodById(id);
  // Assume 404 status if the book is not found
  if (!book) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Method not found" } });
  }
  res.status(200).json({ status: "success", data: book });
});

// Endpoint to create a new book
app.post("/method/", async function (req, res) {
  const data = req.body;
  const book = await createMethod(data);
  res.status(201).json({ status: "success", data: book });
});

// Endpoint to update a specific book by id
app.patch("/method/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  const book = await updateMethodById(id, data);
  // Assume 404 status if the book is not found
  if (!book) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Method not found" } });
  }

  res.status(200).json({ status: "success", data: book });
});

// Endpoint to delete a specific book by id
app.delete("/method/:id", async function (req, res) {
  const id = req.params.id;
  const book = await deleteMethodById(id);
  // Assume 404 status if the book is not found
  if (!book) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Method not found" } });
  }
  res.status(200).json({ status: "success", data: book });
});

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
