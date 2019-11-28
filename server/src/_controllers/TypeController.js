const Type = require('../_models/Type');

module.exports = {
  async index(req, res) {
    await Type.find({}).then(result => {
      (result != null) ? res.json(result) : res.send('No Types found.')
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0): ${err.message}`
      })
    })
  },

  async store(req, res) {
    const newType = new Type({
      name: req.body.name,
      extraPrice: req.body.extraPrice
    });

    await newType.save().then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0): ${err.message}`
      })
    })
  },

  async findById(req, res) {
    await Type.find({id: req.params.id}).then(result => {
      (result != null) ? res.json(result) : res.send('Type specified not found.');
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0) ${err.message}`
      })
    })
  },

  async destroy(req, res) {
    await Type.find({id: req.body.id}).then(result => {
      if (result != null) {
        result.delete().then(cb => {
          res.send(cb)
        }).catch(err => {
          res.status(500).send({
            error: `errcode(1): ${err.message}`
          });
        });
      } else {
        res.send('Type specified not found.');
      }
    }).catch(err => {
      res.status(500).send({
        error: `errcode(0): ${err.message}`
      })
    })
  }
};
