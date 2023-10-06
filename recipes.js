// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./index.js";

export async function getRecipes() {
  // Query the database and return all recipes

  //Define the SQL query to fetch all recipes from the 'recipes' table
  const queryText = "SELECT * FROM recipes_table";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getRecipesById(id) {
  // Query the database and return the recipes with a matching id or null

  // Define the SQL query to fetch the recipes with the specified id from the 'recipe' table
  const queryText = "SELECT * FROM recipes_table WHERE id = $1";

  //Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [id]);

  // The rows property of the result object contains the retrieved records
  // If a recipes with the specified id exists, it will be the first element in the rows array
  // If no recipes exists with the specified id, the rows array will be empty
  return result.rows[0] || null;
}

export async function createRecipe(recipe) {
  // Query the database to create an recipe and return the newly created recipe
  const queryText =
    "INSERT INTO recipes_table(recipe_name,recipe_time) VALUES ($1, $2) RETURNING *";
  // Creating array of variables from recipe object to pass in pool query
  const values = [recipe.recipe_name, recipe.recipe_time];
  // Use the pool object along with the values array to complete the query
  const result = await pool.query(queryText, values);

  //return the newly created recipe
  return result.rows || null;
}

export async function updateRecipeById(id, updates) {
  // Query the database to update an recipe and return the newly updated recipe or null
  const queryText = "UPDATE recipes SET recipe_name =$1,recipe_time = $2 WHERE id = $3 RETURNING *";
  const values = [updates.recipe_name, updates.recipe_time, id];
  const result = await pool.query(queryText, values);
  // return updated book
  return result.rows || null;
}
  
export async function deleteRecipeById(id) {
  // Query the database to delete an recipe and return the deleted recipe or null
  const queryText = "DELETE FROM recipes Where id = $1 RETURNING *";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

