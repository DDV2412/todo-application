import express from "express";
import userController from "../controllers/userController";
import todoController from "../controllers/todoController";
import auth from "../middleware/auth";

class Router {
  router: express.Router = express.Router();

  constructor() {
    this.router.post("/login", userController.login);
    this.router.get("/generate", userController.generate);

    this.router.post("/todo", auth.authenticate, todoController.create);
    this.router.put("/todo/:id", auth.authenticate, todoController.update);
    this.router.get("/todo", auth.authenticate, todoController.findAll);
    this.router.get("/todo/:id", auth.authenticate, todoController.findOne);
    this.router.delete("/todo/:id", auth.authenticate, todoController.delete);
  }
}

export default new Router().router;
