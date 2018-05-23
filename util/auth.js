'use strict';

const rp = require('request-promise');
const db = require('./db');
module.exports = {
  injectAuthData(req,res,next){
      if(req.user) {
          res.locals.isAuthenticated = true;
          res.locals.user = req.user;
      } else {
          res.locals.isAuthenticated = false;
      }
      next();
  },
    checkToken(token,done){
      rp({
          uri : 'https://account.codingblocks.com/api/users/me',
          headers : {
              'Authorization' : `Bearer ${token}`
          },
          json : true
      }).then(data=>{
        return db.User.findOne({ where : {id : data.id } });
      }).then(user=>{
          if(user.role === 'admin')
              done(null,user);
          else
              done('Unauthroized');
      }).catch(err=>{
          done('Unauthroized');
      });

  },
    oauth2Success(accessToken, refreshToken, profile, cb) {
        console.log(accessToken , refreshToken , profile);
        return rp({
            uri    : 'https://account.codingblocks.com/api/users/me',
            qs : {
                include : 'github'
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            json   : true
        }).then( data=>{
            const user = db.User.findOrCreate({
                where : { oneauthId : data.id },
                defaults : { role : 'user'}
            });

            return user.spread((userDB, created) => {
                data.role = userDB.role;
                return cb(null,data);

            });
        });
    }
};
