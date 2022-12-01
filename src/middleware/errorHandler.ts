import { NextFunction, Request, Response } from "express";
const errororMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.message = error.message || "Internal server erroror";

  error.statusCode = error.statusCode || 500;

  res.status = error.statusCode;

  res.json({
    status: false,
    message: error.message,
    payload: null,
  });
};

export default errororMiddleware;
