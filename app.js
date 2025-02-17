const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

// const router = express.Router();

const app = express();

app.use(bodyParser.json()); // application/json
// app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});


// const { getAll, getOne, create, update, remove } = require('../controllers/books');