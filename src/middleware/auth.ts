import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import ErrorHandler from "../utils/ErrorHandler";

declare global {
  namespace Express {
    export interface Request {
      user: Object;
    }
  }
}

class Authenticate {
  getToken = (token: string) => {
    let auth = token.split(" ");

    if (auth.length > 1) {
      return auth[1];
    }

    return auth[0];
  };

  authenticate = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.headers["authorization"] != "string") {
      return next(new ErrorHandler("UNAUTHORIZED", 401));
    }

    let token = this.getToken(req.headers["authorization"]);

    let payload = null;

    try {
      payload = jwt.verify(token, String(process.env.SECRET_JWT));
    } catch (error) {
      return next(new ErrorHandler("UNAUTHORIZED", 401));
    }

    req.user = payload;

    next();
  };
}

export default new Authenticate();
