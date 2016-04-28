'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
      return queryInterface.createTable('orders', {
        id: Sequelize.INTEGER,
        name: Sequelize.String,
      });
    
  },

  down: function (queryInterface, Sequelize) {
    
      return queryInterface.dropTable('orders');
    
  }
};
