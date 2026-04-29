const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const authController = require('./controllers/auth')
const usersController = require('./controllers/users')
const verifyJwt = require('./middleware/verify-jwt')
const hootsController = require("./controllers/hoots.js");

require('./db/connection')

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes

app.use('/auth', authController)
app.use(verifyJwt);
app.use('/users', usersController)
app.use('/hoots', hootsController)

app.listen(3000, () => {
    console.log('The express app is ready!');
});