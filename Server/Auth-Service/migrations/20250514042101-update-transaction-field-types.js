"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("transactions", "orderID", {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "0",
        });

        await queryInterface.addColumn("transactions", "quantity", {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "1",
        });

        await queryInterface.removeColumn("transactions", "discount");
        await queryInterface.removeColumn("transactions", "customer");
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("transactions", "orderID");
        await queryInterface.removeColumn("transactions", "quantity");

        await queryInterface.addColumn("transactions", "discount", {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "0",
        });

        await queryInterface.addColumn("transactions", "customer", {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "",
        });
    },
};
