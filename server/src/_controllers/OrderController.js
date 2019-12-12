const Order = require('../_models/Order');

module.exports = {
  async index(req, res) {
    await Order.find({}).sort({createdAt: 'desc'}).then(result => {
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
    await Order.findById(req.params.id).sort({createdAt: 'desc'}).then(result => {
      (result !== null) ? res.json(result) : res.status(200).send('Order not found.');
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0): ${err.message}`
      })
    })
  },

  async findByStatus(req, res) {
    await Order.find({status: req.params.status}).sort({createdAt: 'desc'}).then(result => {
      (result != null) ? res.json(result) : res.send('No Orders found')
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0): ${err.message}`
      })
    })
  },

  async updateStatus(req, res) {
    await Order.findById(req.body.id).then(order => {
      return Object.assign(order, {status: req.body.status});
    }).then(order => {
      return order.save()
    }).then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0): ${err.message}`
      })
    })
  }
};
