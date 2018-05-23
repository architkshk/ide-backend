const passport = require('passport');

module.exports = app => {

    app.get('/login', passport.authenticate('oauth2', { failureRedirect: '/failed' }) );
    app.get('/login/callback', passport.authenticate('oauth2', { failureRedirect: '/failed' }) , (req,res)=>{
        res.redirect('/');
        console.log('logged n');
    });

    app.get('/logout', (req,res)=>{
        req.session.destroy();
        res.redirect('/');
    });

};
