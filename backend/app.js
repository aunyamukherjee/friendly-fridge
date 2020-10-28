const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const foodRoutes = require('./routes/food-routes');
const usersRoutes = require('./routes/users-routes');
const foodgroupRoutes = require('./routes/foodgroup-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

//for CORS header settings
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

  next();
});



app.use('/api/food', foodRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/foodgroups', foodgroupRoutes);


app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n8bsn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(5000);
    console.log("Started");
  })
  .catch(err => {
    console.log(err);
  });

