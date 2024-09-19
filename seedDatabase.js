// seedDatabase.js
const mongoose = require('mongoose');
require('dotenv').config(); // Make sure to npm install dotenv

// Use the same schema as in your main application
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

const sampleRecipes = [
  {
    name: "Spaghetti Carbonara",
    ingredients: ["spaghetti", "eggs", "pancetta", "parmesan cheese", "black pepper"],
    instructions: "Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all ingredients."
  },
  {
    name: "Chicken Stir Fry",
    ingredients: ["chicken breast", "bell peppers", "onion", "soy sauce", "vegetable oil"],
    instructions: "Cut chicken and vegetables. Stir fry chicken, add vegetables and soy sauce."
  },
  {
    name: "Vegetable Soup",
    ingredients: ["carrots", "celery", "onion", "vegetable broth", "tomatoes"],
    instructions: "Chop vegetables. Simmer in broth. Add tomatoes and seasonings."
  },
  {
    name: "Grilled Cheese Sandwich",
    ingredients: ["bread", "cheddar cheese", "butter"],
    instructions: "Butter bread. Add cheese between slices. Grill until golden and cheese melts."
  },
  {
    name: "Caesar Salad",
    ingredients: ["romaine lettuce", "croutons", "parmesan cheese", "caesar dressing"],
    instructions: "Chop lettuce. Toss with croutons, cheese, and dressing."
  },
  {
    name: "Banana Smoothie",
    ingredients: ["banana", "milk", "yogurt", "honey"],
    instructions: "Blend all ingredients until smooth."
  },
  {
    name: "Omelette",
    ingredients: ["eggs", "cheese", "ham", "bell peppers", "butter"],
    instructions: "Beat eggs. Cook in butter. Add fillings. Fold and serve."
  },
  {
    name: "Guacamole",
    ingredients: ["avocado", "tomato", "onion", "lime juice", "cilantro"],
    instructions: "Mash avocado. Mix in chopped vegetables and lime juice."
  },
  {
    name: "Pancakes",
    ingredients: ["flour", "milk", "eggs", "baking powder", "butter"],
    instructions: "Mix ingredients. Cook on griddle until golden brown."
  },
  {
    name: "Caprese Salad",
    ingredients: ["tomatoes", "mozzarella", "basil", "olive oil", "balsamic vinegar"],
    instructions: "Slice tomatoes and mozzarella. Layer with basil. Drizzle with oil and vinegar."
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    // Insert new recipes
    const result = await Recipe.insertMany(sampleRecipes);
    console.log(`${result.length} recipes inserted`);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();