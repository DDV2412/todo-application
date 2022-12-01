"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "todos",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            type: DataTypes.UUID,
          },
          user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: {
                tableName: "users",
              },
              key: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
          },
          taskName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          startDate: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          status: {
            type: DataTypes.ENUM("todo", "testing", "complete"),
            allowNull: false,
            defaultValue: "todo",
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: true,
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
      await queryInterface.dropTable("todos", { transaction });
    });
  },
};
