/**
 * Created by bhavyaagg on 23/05/18.
 */

const passport = require('passport');

const bearerStrategy = require('./strategies/bearerStrategy');
const oneauthStrategy = require('./strategies/oneauthStrategy')

passport.use('oneauth', oneauthStrategy);
passport.use('bearer', bearerStrategy);

passport.serializeUser(function (authtokenObject, done) {
  return done(null, {
    id: authtokenObject.userId
  })

});

passport.deserializeUser(function (user, done) {

  models.User.findOne({
    where: {
      id: user.id
    }
  }).then((user) => {
    return done(null, user);
  });

});

module.exports = passport;
