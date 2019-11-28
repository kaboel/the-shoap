const Order = require('./_controllers/OrderController');
const Product = require('./_controllers/ProductController');
const Type = require('./_controllers/TypeController');

module.exports = (App) => {
  // Order End-point
  App.get('/v0/order/:id', Order.findById);
  App.route('/v0/orders')
      .get(Order.index)
      .post(Order.store);

  // Product End-point
  App.route('/v0/products')
      .get(Product.index)
      .post(Product.store);
  App.get('/v0/product/:id', Product.findById);
  App.post('/v0/product/delete', Product.destroy);

  // Type End-point
  App.get('/v0/type/:id', Type.findById);
  App.route('/v0/types')
      .get(Type.index)
      .post(Type.store)
      .delete(Type.destroy);
};
