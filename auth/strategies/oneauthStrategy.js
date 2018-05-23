/**
 * Created by bhavyaagg on 23/05/18.
 */

const oneauthStrategy = require('passport-oneauth').Strategy;
const uid = require('uid2')
const models = require('../../util/dbmodels');
const config = require('../../config');

module.exports = new oneauthStrategy({
    authorizationURL: config.AUTHORIZATION_URL,
    tokenURL: config.TOKEN_URL,
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: config.callBackURL
  },
  function (accessToken, refreshToken, profile, done) {
    models.AuthToken.findOrCreate(
      {
        where: {
          accesstoken: accessToken
        },
        defaults: {
          accesstoken: accessToken,
          clienttoken: uid(16),
          user: {
            oneauthId: profile.id,
            role: profile.role,
          }
        },
        include: [models.User]
      }
    ).then(function (authtokenObject) {
      return done(null, authtokenObject[0].get())
    }).catch(function (err) {
      console.log(err);
    })

  }
)
