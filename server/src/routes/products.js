const express = require('express');
const request = require('request');
const app = express();

const BASE_URL = '/juanedsa/meli/api';
const BASE_URL_MELI = 'https://api.mercadolibre.com/sites/MLA/';
const AUTHOR = {
  name: 'Juan',
  lastName: 'Salazar',
};

app.get(BASE_URL + '/hello-world', function (req, res) {
  res.json({ hello: 'world' });
});

app.get(BASE_URL + '/search', function (req, res) {
  const q = req.query.q;

  request(BASE_URL_MELI + 'search?q=' + q, { json: true }, (err, _res, body) => {
    if (err) {
      return console.log(err);
    }

    const categories = mapCategories(body.filters);
    const items = mapItems(body.results);

    res.json({ ...AUTHOR, ...categories, ...items });
  });
});

function mapCategories(filters) {
  if (filters.length) {
    const categories = filters.filter((filter) => filter.id === 'category');

    return { categories: categories[0].values.map((categorie) => categorie.name) };
  } else {
    return { categories: [] };
  }
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
          full: result.price,
          currency: result.currency_id,
          decimals: parseInt(`${result.price}`.split('.')[1]),
        },
      };
    });
  }

  return { items };
}

module.exports = app;
