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
<<<<<<< HEAD
const hootsController = require("./controllers/hoots.js");
=======
const hootsController = require('./controllers/hoots')
>>>>>>> 76983bf2925da018c78e79f440b6604fcc8f6a9b

require('./db/connection')

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes

app.use('/auth', authController)
app.use(verifyJwt);
app.use('/users', usersController)
<<<<<<< HEAD
app.use('/hoots', hootsController)
=======
app.use('/hoots', hootsController);
>>>>>>> 76983bf2925da018c78e79f440b6604fcc8f6a9b

app.listen(3000, () => {
    console.log('The express app is ready!');
});