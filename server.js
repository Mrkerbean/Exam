const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Updated CORS configuration
app.use(cors({
  origin: ['https://exam-58bp9czj1-kervins-projects-769d5052.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}));

// Add this middleware to log CORS headers
app.use((req, res, next) => {
  console.log('CORS Headers:', res.getHeaders());
  next();
});

app.use(express.json());

// Enable pre-flight requests for all routes
app.options('*', cors());

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// API Routes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'An error occurred while fetching recipes' });
  }
});

app.get('/api/recipes/random', async (req, res) => {
  try {
    const count = await Recipe.countDocuments();
    const random = Math.floor(Math.random() * count);
    const recipe = await Recipe.findOne().skip(random);
    if (!recipe) {
      return res.status(404).json({ error: 'No recipes found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    res.status(500).json({ error: 'An error occurred while fetching a random recipe' });
  }
});

app.post('/api/recipes/filter', async (req, res) => {
  try {
    const { ingredients } = req.body;
    console.log('Received ingredients:', ingredients);

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Invalid or no ingredients provided' });
    }

    // Convert all ingredients to lowercase for case-insensitive matching
    const lowercaseIngredients = ingredients.map(ing => ing.toLowerCase());

    const recipes = await Recipe.find({
      ingredients: { 
        $elemMatch: { 
          $regex: new RegExp(lowercaseIngredients.join('|'), 'i') 
        } 
      }
    }).limit(10);

    console.log('Filtered recipes:', recipes);
    res.json(recipes);
  } catch (error) {
    console.error('Error in /api/recipes/filter:', error);
    res.status(500).json({ error: 'An error occurred while filtering recipes', details: error.message });
  }
});

// Add a new recipe (for testing purposes)
app.post('/api/recipes', async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  
  if (!name || !ingredients || !instructions) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const newRecipe = new Recipe({ name, ingredients, instructions });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'An error occurred while creating the recipe' });
  }
});

if (process.env.VERCEL) {
  // Vercel serverless environment
  module.exports = app;
} else {
  // Local environment
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}