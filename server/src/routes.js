const Order = require('./_controllers/OrderController');
const Product = require('./_controllers/ProductController');

module.exports = (App) => {
  // Order End-point
  App.post('/v0/orders', Order.store);

  // Product End-point
  App.get('/v0/products', Product.index);
  App.post('/v0/products', Product.store);
};
