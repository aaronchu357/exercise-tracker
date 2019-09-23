const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
// app.use(cors({ origin: true, credentials: true }));
// Init Middleware
app.use(express.json());
// app.use(express.json({ extended: false }));

const uri = process.env.ATLAS_URI
// Mongo client(server, actually) constructor
// Server Discover and Monitoring engine
mongoose.connect(
  uri, 
  { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

// Mongo client(server, actually) connector
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// ROUTES
// import HTTP methods
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
// append HTTP methods to endpoints
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port , () => {
  console.log(`Server is running on port ${port}`);
});
