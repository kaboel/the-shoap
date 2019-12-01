const Order = require('./_controllers/OrderController');
const Product = require('./_controllers/ProductController');
const Type = require('./_controllers/TypeController');

const prefix = '/v0';

module.exports = (App) => {
  // Order End-point
  App.route(`${prefix}/v0/orders`)
      .get(Order.index)
      .post(Order.store);
  App.post(`${prefix}/order/update`, Order.updateStatus);
  App.get(`${prefix}/order/:id`, Order.findById);
  App.get(`${prefix}/orders/:status`, Order.findByStatus);

  // Product End-point
  App.route(`${prefix}/products`)
      .get(Product.index)
      .post(Product.store);
  App.get(`${prefix}/product/:id`, Product.findById);
  App.post(`${prefix}/product/delete`, Product.destroy);

  // Type End-point
  App.route(`${prefix}/types`)
      .get(Type.index)
      .post(Type.store);
  App.get(`${prefix}/type/:id`, Type.findById);
  App.post(`${prefix}/type/delete`, Type.destroy);
};
