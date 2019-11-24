const Order = require('./_controllers/OrderController');

module.exports = (App) => {
  App.route('/v0/orders')
      .get(Order.index);
};
