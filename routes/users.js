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
    models.AuthToken.findOne({
      where: {
        userId: req.user.id
      }
    }).then((authtoken) => {
      axios.get('https://account.codingblocks.com/api/users/me', {
        'headers': {
          'Authorization': 'Bearer ' + authtoken.accesstoken
        }
      }).then((data) => {
        res.send(data.data);
      })
    }).catch((err) => {
      res.status(500).send("Server Error")
    })

  }
})

module.exports = router;
