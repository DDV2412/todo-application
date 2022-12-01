import App from "./app";

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

class Server extends App {
  port: number;
  host: string;

  constructor() {
    super();
    this.port = Number(process.env.APP_PORT) || 8080;
    this.host = String(process.env.APP_HOST) || "0.0.0.0";
  }

  render(): void {
    super.render();

    this.app.listen(this.port, () => {
      console.log(
        `This server is running at http://${this.host}:${this.port} with mode ${process.env.NODE_ENV}`
      );
    });
  }
}

new Server().render();
