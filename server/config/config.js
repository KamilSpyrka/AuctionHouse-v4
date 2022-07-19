module.exports = {
    port: process.env.PORT || 5000,
    db: {
        database: process.env.DB_NAME || 'AuctionHouse',
        user: process.env.DB_USER || 'AuctionHouse',
        password: process.env.DB_PASS || 'AuctionHouse',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './AuctionHouse.sqlite'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
      }

}
