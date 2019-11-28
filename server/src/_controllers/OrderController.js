const Order = require('../_models/Order');

module.exports = {
  async index(req, res) {
    await Order.find({}).then(result => {
      (result != null) ? res.json(result) : res.send('No Types found.');
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0): ${err.message}`
      })
    })
  },

  async store(req, res) {
    const order = new Order({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      orders: req.body.order
    });

    await order.save().then(result => {
      res.json(result);
    }).catch(err => {
      res.status(500).send({
        error: `errcode(3[0]): ${err.message}`
      })
    })
  },

  async findById(req, res) {
    await Order.find(req.params.id).then(result => {
      (result != null) ? res.json(result) : res.send('Order not found.');
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0): ${err.message}`
      })
    })
  }
};
