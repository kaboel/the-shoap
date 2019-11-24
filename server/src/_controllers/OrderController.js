const Order = require('../_models/Order');

module.exports = {
   async store(req, res) {
    const customerOrder = new Order({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      orders: req.body.order
    });

    await customerOrder.save().then(customerOrderResult => {
      res.send(customerOrderResult);
    }).catch(err => {
      res.status(500).send({
        error: `errcode(3[0]): ${err.message}`
      });
    });
  },
};
