const config = require('./_helpers/config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const App = express().use(() => {
  cors();
  morgan('combined');
  bodyParser.urlencoded({extended: true});
});

require('./routes')(App);

const dbUri = config.db.uriString;
try {
  mongoose.connect(dbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log('Database connected...');

  try {
    const port = process.env.PORT || config.port;
    App.listen(port, () => {
      console.log(`Server started on port: ${port}...`);
    });
  } catch (e) {
    console.log(`errcode(0): Server failed to start. ${e.message}`);
  }
} catch (e) {
  console.log(`errcode(1): ${e.message}`);
}


