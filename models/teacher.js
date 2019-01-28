'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: `email format is incorrect`
        },
        isUnique: function (value) {
          return Teacher.findOne({where: {email: value}})
            .then((data) => {
              if (data) {
                if(data.dataValues.id != this.id) {
                  throw new Error(`email already in use`)
                }
              }
            })
            .catch((err) => {
              throw new Error(err)
            })
          
        }
      }},
      
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};