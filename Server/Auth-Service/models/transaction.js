'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Transaction extends Model {
    static associate(models) {
      // A transaction belongs to a user
      Transaction.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'user',
      });
    }
  }

  Transaction.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Table name for the User model
          key: 'id',
        },
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      item: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sellingPrice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions',
      timestamps: true, // Enable createdAt and updatedAt
    }
  );

  return Transaction;
};