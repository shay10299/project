require('dotenv').config()

module.exports = {
  development: {
    url: process.env.projectDB_URL,
    dialect: 'postgres',
    jwtPrivateKey: process.env.jwtPrivateKey

  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}