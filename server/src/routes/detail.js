const express = require('express');
const request = require('request');
const app = express();

const { BASE_URL, BASE_URL_MELI, AUTHOR } = require('../shared/constants');

app.get(BASE_URL + '/items/:id', function (req, res) {
  let id = req.params.id;

  request(BASE_URL_MELI + id, { json: true }, (err, _res, body) => {
    if (err) {
      return console.log(err);
    }

    const item = mapItem(body);

    request(BASE_URL_MELI + id + '/description', { json: true }, (err, _res, body) => {
      if (err) {
        return console.log(err);
      }

      res.json({ ...AUTHOR, ...item, description: body.plain_text });
    });
  });
});

function mapItem(body) {
  return {
    item: {
      id: body.id,
      title: body.title,
      condition: body.condition,
      picture: body.pictures[0].secure_url,
      shipping: body.shipping.free_shipping,
      sold_quantity: body.sold_quantity,
      price: {
        amount: Math.trunc(body.price),
        currency: body.currency_id,
        decimals: parseInt(`${body.price}`.split('.')[1]),
      },
    },
  };
}

module.exports = app;
