import { pool } from "index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
      DROP TABLE IF EXISTS how_to_make CASCADE;
      DROP TABLE IF EXISTS recipes_table CASCADE;
    `);

    // Create the recipes table
    await pool.query(`
      CREATE TABLE recipes_table (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        recipe_name VARCHAR(500) NOT NULL,
        recipe_time VARCHAR(500) NOT NULL
      );
    `);

    // Create the how to make table with a foreign key to the recipies table
    await pool.query(`
      CREATE TABLE how_to_make (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        recipe_id INT REFERENCES recipes_table(id)
        ingredients VARCHAR(500) NOT NULL,
        method VARCHAR(500) NOT NULL
      );
    `);

    // Seed the recipies table
    await pool.query(`
      INSERT INTO recipes_table (recipe_name, recipe_time)
      VALUES 
        ('Pumpkin & bacon soup', '1 hr and 10 mins'),
        ('Pumpkin cheesecake', '1 hr and 45 mins'),
        ('One-pot roast guinea fowl', '1 hr and 40 mins'),
        ('Apple jam', '40 mins');
    `);

    // Seed the books table
    await pool.query(`
      INSERT INTO how_to_make (recipe_id, ingredients, method)
      VALUES 
        (1, '1 tbsp vegetable oil
        50g butter
        1 onion, finely chopped
        150g maple-cured bacon, cut into small pieces', 'In a large pan, heat oil and 25g butter, then sauté onions and bacon until soft. Add pumpkin, stock, and simmer for 40 minutes. Stir in cream, blend until smooth, adjust consistency with liquid, strain, and set aside. In a separate pan, melt the remaining butter and fry the remaining bacon with black pepper for 5 minutes. Divide the bacon among four bowls, reheat the soup, and pour it over the bacon. Finish by sprinkling pumpkin seeds and drizzling with maple syrup before serving.'),
        (2, '80g butter
        275g digestive or ginger biscuits
        1 large egg white
        800g full-fat soft cheese
        425g can pumpkin purée
        200g light brown soft sugar
        50g plain flour
        5 large eggs + 1 large yolk', 'Prepare a cake tin, make a biscuit base, mix a pumpkin cheesecake filling, bake in a water bath, cool, chill overnight, and serve with whipped cream, cinnamon, pecans, and caramel sauce.'),
        (3, 'Onion
        Carrots
        Potato
        Olive oil
        Small guinea fowl
        Butter
        Smoked bacon
        Garlic cloves
        Thyme sprigs
        Chicken stock
        White wine
        Plain flour
        Redcurrant jelly', 'Roast the seasoned guinea fowl with bacon on a bed of vegetables, add garlic, thyme, stock, and wine, roast until the bird is cooked, then roast the vegetables separately, make a sauce from the pan juices with butter, flour, and redcurrant jelly, and serve the sliced bird, crispy bacon, and vegetables with the sauce on the side.'),
        (4, '1kg Bramley apples, peeled, cored and chopped
        250g caster sugar
        ½ lemon, juiced
        1 cinnamon stick', 'Simmer chopped apples, sugar, and water until the apples collapse, then add lemon juice and a cinnamon stick, simmer until thick and glossy, check the consistency on a frozen plate, and once it's firm, transfer to sterilized jars for storage.');
    `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
