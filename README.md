# Recipe API

A simple Express.js API for managing recipes with MongoDB.

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/recipe-api.git
   cd recipe-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the project root and add your MongoDB URI:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   ```

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

- `GET /api/recipes`: Fetch all recipes
- `GET /api/recipes/random`: Fetch a random recipe
- `POST /api/recipes`: Create a new recipe
  - Body: `{ name: string, ingredients: string[], instructions: string[] }`

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

