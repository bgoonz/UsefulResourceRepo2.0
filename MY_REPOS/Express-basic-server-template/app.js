const express = require('express');

const { createError } = require('./utils');
const fileRouter = require('./routes/fileRouter');

require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  console.log(`Req made on ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>App Running Successfully</h1>');
});

app.use('/files', fileRouter);

app.use((req, res, next) => {
  next(createError(404, 'Page not found'));
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ status: 'Error', message: error.message });
});

app.listen(process.env.PORT, () => {
  console.log(`App running on PORT ${process.env.PORT}`);
});
