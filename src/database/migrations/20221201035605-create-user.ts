"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "users",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            type: DataTypes.UUID,
          },
          pin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
        },
        {
          transaction,
        }
      );
    });
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("users", { transaction });
    });
  },
};
