require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');

const app = express();
const port = process.env.PORT || 5656;
const db = mongoose.connect(process.env.DB_ADDRESS);


// setting body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})