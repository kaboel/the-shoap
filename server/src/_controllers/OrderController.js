const Order = require('../_models/Order');
const CustomerOrder = require('../_models/CustomerOrder');

module.exports = {
  async store(req, res) {
    const customerOrder = new CustomerOrder({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address
    });
    await customerOrder.save().then(result => {
      let id = result.id;

    }).catch(err => {
      res.status(500).send({
        error: `errcode(3): ${err.message}`
      });
    });
  }
};
