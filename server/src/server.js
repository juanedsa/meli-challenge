require('./config/config');

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: true,
  methods: 'DELETE,PUT,GET,POST,OPTIONS',
  allowedHeaders: [
    'Accept',
    'Accept-Encoding',
    'Accept-Language',
    'Cache-Control',
    'Connection',
    'Content-Length',
    'Content-Type',
    'Host',
    'Origin',
    'Pragma',
    'Referer',
    'User-Agent',
    'Authorization',
  ],
  credentials: true,
};

//Cors
app.use(cors(corsOptions));

// Routes
app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
  console.log('Escuchando puerto: ', process.env.PORT);
});
