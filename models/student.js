'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: `email format is incorrect`
        },
        isUnique: function(value) {
          return Student.findOne({
            where: {email: value}
          })
            .then((data) => {
              if (data) {
                if (this.id == data.dataValues.id) {
                  throw `email already in use`
                }
              }
            })
            .catch(err => {
              throw err;
            }) 
        }
      }
    }
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {through: 'StudentSubject'})
    
  };
  return Student;
};