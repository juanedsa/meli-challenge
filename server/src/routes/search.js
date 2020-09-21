const express = require('express');
const request = require('request');
const app = express();

const { BASE_URL, BASE_URL_MELI_MLA, AUTHOR } = require('../shared/constants');

app.get(BASE_URL + '/hello-world', function (req, res) {
  res.json({ hello: 'world' });
});

app.get(BASE_URL + '/search', function (req, res) {
  const q = req.query.q;

  request(BASE_URL_MELI_MLA + 'search?q=' + q, { json: true }, (err, _res, body) => {
    if (err) {
      return console.log(err);
    }

    const categories = mapCategories(body.filters);
    const items = mapItems(body.results);

    res.json({ ...AUTHOR, ...categories, ...items });
  });
});

function mapCategories(filters) {
  let categories = [];

  if (filters.length) {
    const categoriesArray = filters.filter((filter) => filter.id === 'category');
    categories = categoriesArray[0].values.map((category) => category.name);
  }

  return { categories };
}

function mapItems(results) {
  let items = [];

  if (results.length) {
    items = results.map((result) => {
      return {
        id: result.id,
        title: result.title,
        condition: result.condition,
        picture: result.thumbnail,
        shipping: result.shipping.free_shipping,
        price: {
          amount: Math.trunc(result.price),
          currency: result.currency_id,
          decimals: parseInt(`${result.price}`.split('.')[1]),
        },
      };
    });
  }

  return { items };
}

module.exports = app;
