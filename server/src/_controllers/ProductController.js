const Product = require('../_models/Product');

module.exports = {
  async index(req, res) {
    await Product.find({})
        .then(result => {
          (result != null) ? res.json(result) : res.send('No Products found.');
        }).catch(err => {
          res.status(500).send({
            error: `errcode(2): ${err.message}`
          })
        })
  },

  async store(req, res) {
    const newProduct = new Product(req.body);
    await newProduct.save()
      .then(result => {
        res.json(result);
      }).catch(err => {
        res.status(500).send({
          error: `errcode(3): ${err.message}`
        })
      })
  },

  async findById(req, res) {
    await Product.find({id: req.params.id}).then(result => {
      (result != null) ? res.json(result) : 'Product not found.';
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0): ${err.message}`
      })
    })
  }
};
