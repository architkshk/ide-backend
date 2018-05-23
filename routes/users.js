var express = require('express');
var router = express.Router();
const passport = require('./../auth/passport')
const axios = require('axios')
const models = require('../util/dbmodels')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login/cb', passport.authenticate('oneauth'));

router.get('/login/cb/callback', passport.authenticate('oneauth', {failureRedirect: '/'}), function (req, res) {

  return res.redirect('/?clienttoken=' + req.user.clienttoken);

});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/me', passport.authenticate('bearer'), (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("Please Login")
  } else {
    models.User.findOne({
      where: {
        id: req.user.id
      }
    }).then((user) => {
      res.send(user.get());
    }).catch((err) => {
      console.log(err)
      res.status(500).send("Server Error")
    })

  }
})

module.exports = router;
