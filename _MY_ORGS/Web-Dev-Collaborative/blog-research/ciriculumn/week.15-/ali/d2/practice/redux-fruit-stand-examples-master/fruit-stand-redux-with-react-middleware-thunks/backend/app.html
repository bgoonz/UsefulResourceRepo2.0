const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { environment } = require('./config');
const fruitsRouter = require('./routes/fruits');
const farmersRouter = require('./routes/farmers');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fruit Stand service!' });
});

app.use('/fruits', fruitsRouter);
app.use('/farmers', farmersRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Generic error handler.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
