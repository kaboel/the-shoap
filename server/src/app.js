const config = require('./_helpers/config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const mongoose = require('mongoose');

const App = express();

App.use(cors());
App.use(morgan('combined'));
App.use(bodyParser.urlencoded({extended: true}));

try {
  const port = process.env.PORT || config.port;
  App.listen(port, () => {
    console.log(`Server started on port: ${port}...`);
  });
} catch (e) {
  console.log('errcode(0): Server failed to start.');
}


