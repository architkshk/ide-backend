const db = require('./db');

function getUserDetails(userId){
    const details = db.User.findById(userId);
    return Promise.all([user]);
};

exports = module.exports = getUserDetails;