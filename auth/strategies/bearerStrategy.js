/**
 * Created by bhavyaagg on 23/05/18.
 */
const BearerStrategy = require('passport-http-bearer').Strategy;
const models = require('../../util/dbmodels');

module.exports = new BearerStrategy(function (token, done) {

  if (token === null || token === undefined) {
    return done(null, false, {message: 'Could not authorize'});
  }
  models.AuthToken.findOne({
    where: {
      clienttoken: token
    },
    include: [models.User]
  }).then(function (authToken) {
    if (authToken && authToken.user) {
      return done(null, authToken.user);
    }
    else {
      return done(null, false, {message: 'Could not authorize'});
    }
  }).catch(function (err) {
    return done(err, false);
  });

})
