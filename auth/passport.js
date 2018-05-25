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
    id: authtokenObject.UserId
  })

});

passport.deserializeUser(function (User, done) {

  models.User.findOne({
    where: {
      id: User.id
    }
  }).then((User) => {
    return done(null, User);
  });

});

module.exports = passport;
