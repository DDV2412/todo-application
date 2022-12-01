"use strict";
import { Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface TodoInterface {
  user_id: string;
  taskName: string;
  startDate: Date;
  dueDate: Date;
  status: string;
  description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class todo extends Model<TodoInterface> {
    declare user_id: string;
    declare taskName: string;
    declare startDate: Date;
    declare dueDate: Date;
    declare status: string;
    declare description: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      this.belongsTo(models.user, {
        foreignKey: "user_id",
      });
    }
  }
  todo.init(
    {
      user_id: {
        type: DataTypes.UUID,
      },
      taskName: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.DATE,
      },
      dueDate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM("todo", "testing", "complete"),
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "todo",
    }
  );

  todo.beforeSave("beforeSave", (todoData: todo) => {
    todoData["id"] = uuidv4();
  });

  return todo;
};
