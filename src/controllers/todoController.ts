import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import joi from "joi";

class TodoController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['Todo']
      #swagger.summary = 'Todo create'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Todo',
            required: true,
            schema: {
              $ref: '#/definitions/todo'
            }
          },
      #swagger.responses[200] = {
            description: 'Todo successfully.',
            schema: [{ $ref: '#/definitions/TodoResponse' }]
      }
      #swagger.responses[404] = {
            description: 'Todo not found.',
            schema: {
              "status": false,
              "message": "Task not found",
              "payload": null
            }
      }
      #swagger.responses[400] = {
            description: 'Todo missing validation.',
            schema: {
              "status": false,
              "message": "",
              "payload": null
            }
      }
      #swagger.responses[500] = {
            description: 'Server error.',
            schema: {
              "status": false,
              "message": "",
              "payload": null
            }
      }
      */
    try {
      const { error } = joi
        .object({
          taskName: joi.string().required().messages({
            "string.emty": "Task name cannot be an empty field",
            "any.required": "Task name is required field",
          }),
        })
        .validate(req.body);

      if (error) {
        return next(new ErrorHandler(error["details"][0].message, 400));
      }

      req.body["user_id"] = req.user["id"];
      const task = await req.todoUC.create(req.body);

      res.json({
        status: true,
        message: "Successfully created task ID " + task["id"],
        payload: task,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error["message"], 500));
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['Todo']
      #swagger.summary = 'Todo update by ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Todo',
            required: true,
            schema: {
              $ref: '#/definitions/todo'
            }
          },
      #swagger.responses[200] = {
            description: 'Todo successfully.',
            schema: [{ $ref: '#/definitions/TodoResponse' }]
      }
      #swagger.responses[404] = {
            description: 'Todo not found.',
            schema: {
              "status": false,
              "message": "Task not found",
              "payload": null
            }
      }
      #swagger.responses[400] = {
            description: 'Todo missing validation.',
            schema: {
              "status": false,
              "message": "",
              "payload": null
            }
      }
      #swagger.responses[500] = {
            description: 'Server error.',
            schema: {
              "status": false,
              "message": "",
              "payload": null
            }
      }
      */
    let id = req.params["id"];
    try {
      req.body["user_id"] = req.user["id"];
      await req.todoUC.update(id, req.body);

      const task = await req.todoUC.findOne(id);

      res.json({
        status: true,
        message: "Successfully updated task ID " + id,
        payload: task,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error["message"], 500));
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['Todo']
      #swagger.summary = 'Todo Find By ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.responses[200] = {
            description: 'Todo successfully.',
            schema: [{ $ref: '#/definitions/TodoResponse' }]
      }
      #swagger.responses[404] = {
            description: 'Todo not found.',
            schema: {
              "status": false,
              "message": "Task not found",
              "payload": null
            }
      }
      */
    let id = req.params["id"];
    try {
      req.body["user_id"] = req.user["id"];
      const task = await req.todoUC.findOne(id);

      if (!task) {
        return next(new ErrorHandler("Task not found", 404));
      }
      res.json({
        status: true,
        message: "Successfully find task ID " + id,
        payload: task,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error["message"], 500));
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['Todo']
      #swagger.summary = 'Todo Find All'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.responses[200] = {
            description: 'Todo successfully.',
            schema: [{ $ref: '#/definitions/TodoResponse' }]
      }
      
      */
    try {
      req.body["user_id"] = req.user["id"];
      const task = await req.todoUC.findAll(req.user["id"]);

      res.json({
        status: true,
        message: "Successfully find all tasks",
        payload: task,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error["message"], 500));
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['Todo']
      #swagger.summary = 'Todo delete by ID'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.responses[200] = {
            description: 'Todo successfully.',
            schema: {
              "status": true,
              "message": "Successfully deleted task ID",
              "payload": null
            }
      }
      #swagger.responses[404] = {
            description: 'Todo not found.',
            schema: {
              "status": false,
              "message": "Task not found",
              "payload": null
            }
      }
      */
    let id = req.params["id"];

    try {
      const task = await req.todoUC.findOne(id);

      if (!task) {
        return next(new ErrorHandler("Task not found", 404));
      }

      await req.todoUC.deleteById(id);

      res.json({
        status: true,
        message: "Successfully deleted task ID " + id,
        payload: null,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error["message"], 500));
    }
  };
}

export default new TodoController();
