'use strict';

var statuses = [
  'NEW',
  'PENDING_APPROVAL',
  'PENDING_REVIEW',
  'APPROVED_FOR_SALE',
  'PENDING_BUYER_REVIEW',
  'BUYER_REVISED',
  'BUYER_APPROVED',
  'REJECTED'
];

module.exports = function(sequelize, DataTypes) {
  var proposal = sequelize.define('proposal', {
    name: DataTypes.STRING,
    // summary: DataTypes.TEXT,
    // budget: DataTypes.DECIMAL(10, 2),
    // goals: DataTypes.TEXT,
    status: DataTypes.ENUM(statuses),
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    getterMethods   : {
      goals: function()  {
        return JSON.parse(this.getDataValue('goals'))
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return proposal;
};