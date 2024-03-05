import { NextFunction, Request, Response } from "../types";

export const errorMiddleware = (error, request: Request, response: Response, next: NextFunction) => {
    console.log(error);
    return response.send({error});
}

