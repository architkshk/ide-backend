'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    oneauthId: DataTypes.BIGINT,
    role: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.AuthToken)
  };
  return User;
};
