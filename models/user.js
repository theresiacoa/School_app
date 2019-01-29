'use strict';
const hash = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    secret: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.dataValues.password = `hacktiv8${user.dataValues.name}`;
        return new Promise((resolve, reject) => {
          hash(user.dataValues.password)
            .then((data) => {
              user.dataValues.password = data;
              resolve()
            })
            .catch((err) => {
              reject(err);
            })
        })
      } 
    }
  });
  User.associate = function(models) {
    
  };
  return User;
};