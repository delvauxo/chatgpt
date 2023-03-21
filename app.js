const express = require('express');
const chatgptRouter = require('./routes/chatgpt-router');
const router = express.Router();

// Load env filecan you create the .env file for me with 
require('dotenv-flow').config();

// Get env variable
const { PORT, NODE_ENV } = process.env;

// Create Web API
const app = express();

// Serve static files from the public folder
app.use(express.static('public'));
// Add middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add Routing
app.use('/api/chatgpt', chatgptRouter);

// Start Web API
app.listen(PORT, () => {
    console.log(`Web API up on port ${PORT}  [${NODE_ENV}]`);
});
