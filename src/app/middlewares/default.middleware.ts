import { NextFunction, Request, Response } from "../types";

export const defaultMiddleware = (request: Request, response: Response, next: NextFunction) => {
    return response.send({message: 'not found'});
}