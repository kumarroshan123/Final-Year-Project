'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'storeName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'businessType', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'gstNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'address', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'establishedYear', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'avgMonthlyRevenue', {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'storeName');
    await queryInterface.removeColumn('users', 'businessType');
    await queryInterface.removeColumn('users', 'gstNumber');
    await queryInterface.removeColumn('users', 'address');
    await queryInterface.removeColumn('users', 'description');
    await queryInterface.removeColumn('users', 'phoneNumber');
    await queryInterface.removeColumn('users', 'establishedYear');
    await queryInterface.removeColumn('users', 'avgMonthlyRevenue');
  }
};