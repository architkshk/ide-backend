const PG = require ('pg');
const Sequelize = require('sequelize');
const secrets = require('../secrets');

const pool = new PG.Pool({
  host: secrets.HOST,
  user: secrets.USER,
  password: secrets.PASS,
  database: secrets.DB_NAME,
  max: 50,
  idleTimeoutMillis: 30000
});



const sequelize = process.env.DATABASE_URL ?
    new Sequelize(process.env.DATABASE_URL) :

    new Sequelize(
        secrets.DB_NAME || 'ide',
        secrets.USER || 'ide',
        secrets.PASS || 'ide',
        {
            host: secrets.HOST  || 'localhost',
            dialect: 'postgres',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
        });

const User = sequelize.define('user',{
    id : {
         type      : Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
    },
    oneauthId : Sequelize.STRING,
    role : 'user'
});


module.exports = {
  pool,
  Database: sequelize,
  User
}
