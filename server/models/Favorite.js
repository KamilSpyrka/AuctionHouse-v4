module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {})

    Favorite.associate = function (models) {
        Favorite.belongsTo(models.User)
        Favorite.belongsTo(models.Product)
    }

    return Favorite
}