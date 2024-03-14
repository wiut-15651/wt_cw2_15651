const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/recipes.json");

//get all recipes
async function getRecipes() {
  try {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
  } catch (error) {
    // If there's an error reading the file or parsing JSON, return an empty array
    return [];
  }
}

// read all the recipes
exports.listRecipes = async (req, res) => {
  const recipes = await getRecipes();
  res.render("recipes", { title: "List of Recipes", recipes });
};

//render the new recipe page
exports.showAddRecipeForm = (req, res) => {
  res.render("addRecipe", { title: "Create New Recipe" });
};

//create new recipe logic
exports.addRecipe = async (req, res) => {
  const { name, ingredients, steps } = req.body;

  const newRecipe = {
    id: new Date().getTime(),
    name,
    ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
    steps: steps.split(",").map((step) => step.trim()), // Convert comma-separated string to array
  };

  const recipes = await getRecipes();
  recipes.push(newRecipe);
  await saveRecipes(recipes);
  res.redirect("/recipes"); // Redirect to the list of recipes after adding
};

//render edit recipe page
exports.showEditRecipeForm = async (req, res) => {
  const { id } = req.params;
  const recipes = await getRecipes();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
  if (!recipe) {
    return res.status(404).send("Recipe not found");
  }
  res.render("editRecipe", { title: "Edit Recipe", recipe });
};

// save changes in recipes.json file
async function saveRecipes(recipes) {
  const data = JSON.stringify(recipes, null, 2);
  await fs.writeFile(filePath, data);
}

// update function logic
exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, steps } = req.body;
  const recipes = await getRecipes();
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === parseInt(id));
  if (recipeIndex >= 0) {
    recipes[recipeIndex] = {
      id: parseInt(id),
      name,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      steps: steps.split(",").map((step) => step.trim()),
    };
    await saveRecipes(recipes);
    res.redirect("/recipes");
  } else {
    res.status(404).send("Recipe not found");
  }
};

//delete function
exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const recipes = await getRecipes();
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === parseInt(id));
  if (recipeIndex >= 0) {
    recipes.splice(recipeIndex, 1);
    await saveRecipes(recipes);
    res.redirect("/recipes");
  } else {
    res.status(404).send("Recipe not found");
  }
};
