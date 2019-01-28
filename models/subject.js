'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    Subject.hasMany(models.Teacher);
    Subject.belongsToMany(models.Student, {through: 'StudentSubject'})
  };
  return Subject;
};