const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipeController");

// Route to GET all recipes
router.get("/", recipesController.listRecipes);
router.get("/new", recipesController.showAddRecipeForm);
router.post("/", recipesController.addRecipe);
router.get("/edit/:id", recipesController.showEditRecipeForm);
router.get("/delete/:id", recipesController.deleteRecipe);
router.post("/update/:id", recipesController.updateRecipe);

module.exports = router;
