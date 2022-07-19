const {Favorite, Product} = require('../models')
const _ = require('lodash')

module.exports = {
async getFavorites (req, res) {
    try {
        const {productId, userId} = req.query
        const where = {
            UserId: userId
        }
        if(productId) {
            where.ProductId = productId
        }
        const favorites = await Favorite.findAll({
            where: where,
            include: [
                {model: Product}
            ]
        })

        res.send(favorites)
    }
    catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
},

async addToFavorites (req, res) {
    try {
        const productId = req.body.params.productId
        const userId = req.body.params.userId
        const favorite = await Favorite.findOne({
            where: {
                productId: productId,
                userId: userId
            }
        })

        if (favorite) {
            return res.status(400).send({
                error: 'Already favorite!'
            })
        }
        const newFavorite = await Favorite.create({
            UserId: userId,
            ProductId: productId
        })

        res.send(newFavorite)
    }
    catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
},

async deleteFromFavorites (req, res) {
    try {
        const {favoritesId} = req.params
        const favorite = await Favorite.findOne({
            where: {
                id: favoritesId,
            }
        })
        if(!favorite) {
            return res.status(403).send({
                error: 'You need to log in'
            })
        }
        await favorite.destroy()
        res.send(favorite)
    }
    catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
},
}