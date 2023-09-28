'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const indexRoutes = require('./routes/index');
const { notFound, globalError } = require('./middleware/errors');
const { testConnection } = require('./middleware/utils');

// variable to enable global error logging

// create the Express app
const app = express();

// Enable All CORS Requests
app.use(cors());

// Setup request body JSON parsing.
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// adds routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use(indexRoutes);

// send 404 if no other route matched
app.use(notFound);

// setup a global error handler
app.use(globalError);

// set our port
app.set('port', process.env.PORT || 5001);

// Test the database connection.
testConnection();

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
