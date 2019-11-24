const Order = require('../_models/Order');
const CustomerOrder = require('../_models/CustomerOrder');

module.exports = {
  async index(request, response) {
    try {
      await CustomerOrder.find({}, (err, data) => {
        (data != null) ? response.json(data) : response.send({message: `No Order found.`});
      });
    } catch (e) {
      response.status(500).send({
        error: `errcode(2): ${e.message}`
      });
    }
  },
};
