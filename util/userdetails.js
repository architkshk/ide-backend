const db = require('./db');

function getUserDetails(userId){
    return db.User.findById(userId);
}