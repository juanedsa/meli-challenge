const express = require('express');

const app = express();

app.use(require('./search'));
app.use(require('./detail'));

module.exports = app;
