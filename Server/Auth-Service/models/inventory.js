"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Inventory extends Model {
        static associate(models) {
            // An inventory belongs to a user
            Inventory.belongsTo(models.User, {
                foreignKey: "UserId",
                as: "user",
            });
        }
    }

    Inventory.init(
        {
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            unitPrice: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            holdingQuantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Inventory",
            tableName: "inventories",
            timestamps: true,
        }
    );

    return Inventory;
};
