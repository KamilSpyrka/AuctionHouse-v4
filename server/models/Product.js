module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        title: DataTypes.STRING,
        price: DataTypes.NUMBER,
        productImage: DataTypes.STRING,
        description: DataTypes.TEXT,
        contactEmail: DataTypes.STRING,
        username: DataTypes.STRING
    })

    return Product
}