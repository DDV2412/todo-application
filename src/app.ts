import express from "express";
import morgan from "morgan";

class Application {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  render() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("combined"));
  }
}

export default Application;
