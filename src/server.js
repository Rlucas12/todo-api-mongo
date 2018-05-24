require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const projectRouter = require('./routes/projectRouter');
const labelRouter = require('./routes/labelRouter');

const app = express();
const port = 3000;
const db = mongoose.connect(process.env.DB_ADDRESS);


// setting body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/projects', projectRouter);
app.use('/api/labels', labelRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port);
}
  

module.exports = app;