const {Product} = require('../models')

module.exports = {
    async getProducts (req, res) {
        try {
            let products = null
            const search = req.query.search
            const { Op } = require('sequelize')

            if (search) {
              products = await Product.findAll({
                where: {
                  [Op.or]: ['title', 'description', 'username']
                  .map(key => ({[key]: {
                      [Op.like]: `%${search}%`
                    }
                  }))
                }
              })
            }
            else {
                products = await Product.findAll()
            }

            res.send(products)
        }
        catch (err) {
            res.status(500).send({
                error: 'An Error has occured'
            })
        }
    },

    async createProduct (req, res) {
        try {
            const product = await Product.create(req.body)
            res.send(product)
        }
        catch (err) {
            res.status(500).send({
                error: 'An Error has occured'
            })
        }
    },

    async putProduct (req, res) {
        try {
            const product = await Product.update(req.body, {
                where: {id: req.params.productId}
            })
            res.send(req.body)
        }
        catch (err) {
            res.status(500).send({
                error: 'An Error has occured'
            })
        }
    },

    async showProduct (req, res) {
        try {
            const product = await Product.findByPk(req.params.productId)
            res.send(product)
        }
        catch (err) {
            res.status(500).send({
                error: 'An Error has occured'
            })
        }
    },

    async deleteProduct (req, res) {
        try {
            const {productId} = req.params
            const product = await Product.findByPk(productId)
            if(!product) {
                return res.status(403).send({
                    error: productId
                })
            }
            await product.destroy()
            res.send(product)
        }
        catch (err) {
            res.status(500).send({
                error: err.message
            })
        }
    },

}