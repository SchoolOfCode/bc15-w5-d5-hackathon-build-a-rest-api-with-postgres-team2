// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./index.js";

export async function getMethod() {
  // Query the database and return all method

  //Define the SQL query to fetch all method from the 'method' table
  const queryText = "SELECT * FROM How_to_make";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getMethodById(id) {
  // Query the database and return the method with a matching id or null

  // Define the SQL query to fetch the method with the specified id from the 'method' table
  const queryText = "SELECT * FROM How_to_make WHERE id = $1";

  //Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [id]);

  // The rows property of the result object contains the retrieved records
  // If a method with the specified id exists, it will be the first element in the rows array
  // If no method exists with the specified id, the rows array will be empty
  return result.rows[0] || null;
}

export async function createMethod(method) {
  // Query the database to create an method and return the newly created method
  const queryText =
    "INSERT INTO How_to_make(recipe_id, ingredients, method) VALUES ($1, $2, $3) RETURNING *";
  // Creating array of variables from method object to pass in pool query
  const values = [method.recipe_id, method.ingredients, method.method];
  // Use the pool object along with the values array to complete the query
  const result = await pool.query(queryText, values);

  //return the newly created method
  return result.rows || null;
}

export async function updateMethodById(id, updates) {
  // Query the database to update an method and return the newly updated method or null
  const queryText = "UPDATE How_to_make SET recipe_id =$1,ingredients = $2, method = $3 WHERE id = $4 RETURNING *";
  const values = [updates.recipe_id, updates.ingredients, updates.method, id];
  const result = await pool.query(queryText, values);
  // return updated book
  return result.rows || null;
}
  
export async function deleteMethodById(id) {
  // Query the database to delete an method and return the deleted method or null
  const queryText = "DELETE FROM How_to_make Where id = $1 RETURNING *";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}