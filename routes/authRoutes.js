const passport = require('passport');
var db = require('../util/db');

function getUserDetails(userId){
    const details = db.User.findOne({id : userId});
    return Promise.all([details]);
};

module.exports = app => {

    app.get('/login', passport.authenticate('oauth2', { failureRedirect: '/failed' }) );
    app.get('/login/callback', passport.authenticate('oauth2', { failureRedirect: '/failed' }) , (req,res)=>{
        res.redirect('/');
        console.log('logged n');
    });

    app.get('/logout', (req,res)=>{
        req.session = null;
        res.redirect('/');
    });    
    
    app.get('/users/me', (req,res)=>{
        getUserDetails(req.user.id).then(data => {
          res.send({data: data});
        });;
    });

};
