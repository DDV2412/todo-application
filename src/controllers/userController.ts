import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import joi from "joi";

class UserController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['User']
      #swagger.summary = 'User login'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Todo',
            required: true,
            schema: {
              $ref: '#/definitions/user'
            }
          },
      #swagger.responses[200] = {
            description: 'User successfully.',
            schema: [{ $ref: '#/definitions/UserResponse' }]
      }
      #swagger.responses[404] = {
            description: 'Todo not found.',
            schema: {
              "status": false,
              "message": "Task not found",
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
    const { error } = joi
      .object({
        pin: joi.number().required().messages({
          "number.base": `Pin should be a type of 'text'`,
          "number.empty": `Pin cannot be an empty field`,
          "any.required": `Pin is a required field`,
        }),
      })
      .validate(req.body);

    if (error) {
      return next(new ErrorHandler(error["details"][0].message, 400));
    }

    const user = await req.userUC.login(req.body.pin);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.json({
      status: true,
      message: "Successfully login user ID " + user["id"],
      payload: user,
    });
  };

  generate = async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['User']
      #swagger.summary = 'User login'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.responses[200] = {
            description: 'User successfully.',
            schema: [{ $ref: '#/definitions/UserResponse' }]
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
      const user = await req.userUC.generate();

      res.json({
        status: true,
        message: "Successfully generate user with PIN " + user["pin"],
        payload: user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error["message"], 500));
    }
  };
}

export default new UserController();
