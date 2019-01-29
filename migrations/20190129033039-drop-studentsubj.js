'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all(
      [
          queryInterface.removeColumn('StudentSubjects', 'SubjectId'),
          queryInterface.removeColumn('StudentSubjects', 'StudentId')
      ]
    ) 
  },
  
  down: (queryInterface, Sequelize) => {
    /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.
    
    Example:
    return queryInterface.dropTable('users');
    */
   return Promise.all(
     [
       queryInterface.addColumn(
         'StudentSubjects', 
         'SubjectId',
         Sequelize.INTEGER
       ),
       queryInterface.addColumn(
         'StudentSubjects', 
         'StudentId',
         Sequelize.INTEGER
       )
     ]
   )
  }
};
