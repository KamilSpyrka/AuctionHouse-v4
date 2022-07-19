const AuthController = require('./controllers/AuthController')
const ProductsController = require('./controllers/ProductsController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const FavoritesController = require('./controllers/FavoritesController')

module.exports = (app) => {
    //Auth
    app.post('/register',
        AuthControllerPolicy.register,
        AuthController.register)
    app.post('/login', AuthController.login)

    //Products
    app.post('/products',  ProductsController.createProduct)
    app.put('/products/:productId',  ProductsController.putProduct)
    app.get('/products',  ProductsController.getProducts)
    app.get('/products/:productId',  ProductsController.showProduct)
    app.delete('/products/:productId', ProductsController.deleteProduct)

    //Favorites
    app.get('/favorites', FavoritesController.getFavorites)
    app.post('/favorites', FavoritesController.addToFavorites)
    app.delete('/favorites/:favoritesId', FavoritesController.deleteFromFavorites)
}
