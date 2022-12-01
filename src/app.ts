import express from "express";
import morgan from "morgan";
const { sequelize } = require("./models");
import router from "./router/router";
import ErrorHandler from "./middleware/errorHandler";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("./doc/doc.json");
import UserUseCase from "./usecases/userUseCase";
import TodoUseCase from "./usecases/todoUseCase";
import UserRepo from "./repository/userRepo";
import TodoRepo from "./repository/todoRepo";

const userUC = new UserUseCase(new UserRepo());
const todoUC = new TodoUseCase(new TodoRepo());

declare global {
  namespace Express {
    export interface Request {
      userUC: any;
      todoUC: any;
    }
  }
}

class Application {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  render() {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((e: any) => {
        console.error("Unable to connect to the database:", e);
      });

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("combined"));

    this.app.use((req, res, next) => {
      req.userUC = userUC;
      req.todoUC = todoUC;

      next();
    });

    this.app.use("/api", router);

    this.app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.app.use(ErrorHandler);
  }
}

export default Application;
