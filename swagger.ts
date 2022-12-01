import swaggerAutogen from "swagger-autogen";

require("dotenv").config();

const port = Number(process.env.APP_PORT) || 8080;
const host = String(process.env.APP_HOST) || "0.0.0.0";

const doc = {
  info: {
    title: "Todo Applicatiop API",
    description:
      "RESTful API Designed in Node.js for a very simple TODO application.",
  },
  host: host + ":" + port,
  schemes: ["http"],
  definitions: {
    user: {
      pin: 1234,
    },
    todo: {
      user_id: "263bd27a-f6d2-447b-8bfc-ef2372ae2cd0",
      taskName: "Task 1",
      startDate: "2022-12-01T12:09:40.189Z",
      dueDate: "2022-12-01T12:09:40.189Z",
      status: "Enum (todo/testing/complete)",
      description: "Description",
    },
    UserResponse: {
      status: true,
      message: String,
      payload: {
        id: "d8083866-5780-44a4-8c40-e7db0ff4360e",
        pin: 1234,
        token: "Bearer Token",
      },
    },
    TodoResponse: {
      status: true,
      message: "Successfully find all tasks",
      payload: {
        id: "a7e3d952-aac0-45ab-b12c-6e7960f3c0d3",
        user_id: "263bd27a-f6d2-447b-8bfc-ef2372ae2cd0",
        taskName: "Task 2",
        startDate: null,
        dueDate: null,
        status: "testing",
        description: null,
        createdAt: "2022-12-01T11:59:53.803Z",
        updatedAt: "2022-12-01T12:00:23.706Z",
      },
    },
  },
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Enter your bearer token in the format **Bearer &lt;token>**",
    },
  },
};

const outputFile = "./src/doc/doc.json";
const endpointsFiles = ["./src/app.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r);
});
