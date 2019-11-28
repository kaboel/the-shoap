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
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      duration: req.body.duration
    });
    await newProduct.save()
      .then(result => {
        res.json(result);
      }).catch(err => {
        res.status(500).send({
          error: `errcode(3): ${err.message}`
        });
      });
  },

  async findById(req, res) {
    await Product.find({id: req.params.id}).then(result => {
      (result != null) ? res.json(result) : res.send('Product not found.');
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0): ${err.message}`
      });
    });
  },

  async destroy(req, res) {
    await Product.find({id: req.body.id}).then(result => {
      if (result != null) {
        Product.deleteOne({id: result._id}).then(cb => {
          res.send(cb);
        }).catch(err => {
          res.status(500).send({
            error: `errcode(1): ${err.message}`
          })
        })
      } else {
        res.send('Product specified not found.');
      }
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0): ${err.message}`
      });
    });
  }

};
