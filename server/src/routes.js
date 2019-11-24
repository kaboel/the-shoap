const Order = require('./_controllers/CustomerOrderController');

module.exports = (App) => {
  App.route('/v0/orders')
      .get(Order.index);
};
