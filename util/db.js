const PG = require ('pg'),
 config = require('../config')
;

const pool = new PG.Pool({
  host: config.db.HOST,
  user: config.db.USER,
  password: config.db.PASSWORD,
  database: config.db.DB,
  max: 50,
  idleTimeoutMillis: 30000
});

module.exports = pool
