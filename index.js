/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// we are using port 8000
const port = 8000;

// create todoRoutes
const todoRoutes = require('./routes/Todo');

const app = express(); // create the server

// DB connection
mongoose
  .connect('mongodb://127.0.0.1:27017/todoapp', {
  // .connect('mongodb://localhost/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // using this option generates error ... avoid it
  })
  .then(() => {
    console.log('CONNECTED TO DATABASE');
  })
  .catch((err) => {
    console.log(`error occured while connection to DATABASE: ${err}`);
  });

// middleware for cors to allow cross origin resource sharing
app.use(cors());
// middleware to convert our request data into JSON format
app.use(bodyParser.json());

// include the todoRoutes
app.use('/api', todoRoutes);

// start the server in the port 8000
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
