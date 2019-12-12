const Order = require('./_controllers/OrderController');
const Product = require('./_controllers/ProductController');
const Type = require('./_controllers/TypeController');

const prefix = '/v0';

module.exports = (App) => {
  // Order End-point
  App.get(`${prefix}/orders`, Order.index);
  App.post(`${prefix}/orders`, Order.store);
  App.get(`${prefix}/orders/:status`, Order.findByStatus);
  App.get(`${prefix}/order/:id`, Order.findById);
  App.post(`${prefix}/order/update`, Order.updateStatus);

  // Product End-point
  App.get(`${prefix}/products`, Product.index);
  App.post(`${prefix}/products`, Product.store);
  App.get(`${prefix}/product/:id`, Product.findById);
  App.post(`${prefix}/product/delete`, Product.destroy);

  // Type End-point
  App.get(`${prefix}/types`, Type.index);
  App.post(`${prefix}/types`, Type.store);
  App.get(`${prefix}/type/:id`, Type.findById);
  App.post(`${prefix}/type/delete`, Type.destroy);
};
