"use strict";
import { Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface userInterface {
  pin: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class user extends Model<userInterface> {
    declare pin: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      this.hasMany(models.todo, {
        foreignKey: "user_id",
      });
    }
  }
  user.init(
    {
      pin: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  user.beforeSave("beforeSave", (userData: user) => {
    userData["id"] = uuidv4();
  });

  return user;
};
