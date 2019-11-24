const Order = require('./_controllers/OrderController');
const Product = require('./_controllers/ProductController');

module.exports = (App) => {
  // Order End-point
  App.get('/v0/order/:id', Order.findById);
  App.route('/v0/orders')
      .get(Order.index)
      .post(Order.store);

  // Product End-point
  App.get('/v0/product/:id', Product.findById);
  App.route('/v0/products')
      .get(Product.index)
      .post(Product.store);
};
