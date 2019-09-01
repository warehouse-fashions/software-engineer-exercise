const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Get Product Recommendations from data file and create endpoint
let productRecommendations = JSON.parse(fs.readFileSync('./data/recommendations.json'));

// Get Products from data file
let products = JSON.parse(fs.readFileSync('./data/product.json'));

// Endpoints for products and product by id
app.get('/api/products', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(products);
});

// Endpoint for product recommendations
app.get('/api/products/recommendations', (req, res) => {
  res.setHeader('Content-Type', 'application/json');  
  res.status(200);
  res.send(productRecommendations);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);