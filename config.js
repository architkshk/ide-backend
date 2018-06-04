/**
 * Created by bhavyaagg on 23/05/18.
 */

const parseDbUrl = require('parse-database-url')

let config = {};

config.AUTHORIZATION_URL = 'https://account.codingblocks.com/oauth/authorize';
config.TOKEN_URL = 'https://account.codingblocks.com/oauth/token';

config.DEPLOY_CONFIG = process.env.IDE_ENV || 'production'

switch (config.DEPLOY_CONFIG) {
  case 'production':
    config.secrets = require('./secrets')
    config.db = config.secrets.DATABASE
    config.clientId = config.secrets.ONEAUTH.CLIENT_ID;
    config.clientSecret = config.secrets.ONEAUTH.CLIENT_SECRET;
    config.hostName = 'https://ide.codingblocks.com'
    break;

  case 'development':
    config.secrets = require('./secrets-sample')
    config.db = config.secrets.DATABASE
    config.clientId = config.secrets.ONEAUTH.CLIENT_ID;
    config.clientSecret = config.secrets.ONEAUTH.CLIENT_SECRET;
    config.hostName = 'http://localhost:3000'
    break;

  case 'heroku':
    let dbConf = parseDbUrl(process.env.DATABASE_URL)
    config.db = {
      "DB": dbConf.database,
      "USER": dbConf.user,
      "PASSWORD": dbConf.password,
      "DIALECT": dbConf.driver,
      "HOST": dbConf.host,
      "PORT": dbConf.port
    }
    config.clientId = process.env.ONEAUTH_CLIENT_ID || "9300236643";
    config.clientSecret = process.env.ONEAUTH_CLIENT_SECRET || "Yb8oYCqjHIh20upnukFXY9GwAhLYLw7xLVoDaIiCvxB7bKLkugOGdSyG6FVF67WP";
    config.hostName = 'http://ide.herokuapp.com'
    break;
}
config.callBackURL = `${config.hostName}/users/login/cb/callback`;

exports = module.exports = config
