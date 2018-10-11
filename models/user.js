'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  
  User.associate = function(models) {
    User.hasMany(models.savedVenues);
  };

  User.beforeCreate(function(user, options) {
    return user.password = bcrypt.hashSync(user.password, 10);
  });

  User.prototype.validatePass = function(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  User.prototype.toJSON = function() {
    let values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }
  return User;
};