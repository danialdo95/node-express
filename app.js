const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const student = require('./models/student');

const feedRoutes = require('./routes/feed');

const adminRoutes = require('./routes/admin');

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

app.use('/api', adminRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});


sequelize.sync().then(result => {
    console.log(result);
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
    
}).catch(err => {
    console.log(err);
});




// const { getAll, getOne, create, update, remove } = require('../controllers/books');