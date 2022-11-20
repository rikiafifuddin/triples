var knex = require('knex')({
  client: process.env.DB_CLIENT,
  connection: {
    socketPath: process.env.SOCKET_PATH,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
})

export default knex
