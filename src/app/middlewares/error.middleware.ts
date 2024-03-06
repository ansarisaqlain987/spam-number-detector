import { NextFunction, Request, Response } from "../types";

export const errorMiddleware = (error: any, request: Request, response: Response, next: NextFunction) => {
    console.log(error);
    return response.send({error});
}

