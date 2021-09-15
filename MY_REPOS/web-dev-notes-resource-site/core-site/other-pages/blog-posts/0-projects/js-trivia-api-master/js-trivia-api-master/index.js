// set up -----------------------------------------------------

const express = require("express");
const app = express();
const mongoose = require("mongodb");
const port = process.env.PORT || 8080;
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require("cors");

// configuration ----------------------------------------------
require('dotenv').config();
mongoose.connect(process.env.REMOTE_DB_URL, {useUnifiedTopology: true})
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// routes -----------------------------------------------------
app.use(require("./routes/api"));


// listen -----------------------------------------------------

app.listen(port, () => console.log(`Listening on port ${port}`));
