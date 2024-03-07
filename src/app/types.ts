import { Request as ERequest, Response as EResponse, NextFunction as ENextFunction } from 'express';

export type Request<T = any> = ERequest<any, any, T>;
export type Response = EResponse<AppResponse>
export type NextFunction = ENextFunction;
export type WithAuth<T> = T & { auth?: any }

export type AppRoute = {
    method: 'GET' | 'POST',
    endpoint: string,
    middlewares: Middleware[],
    controller: Controller
}

export type AppResponse = {
    message?: string,
    data?: any,
    error?: any,
}

export type Controller = (request: Request, response: Response) => Response | Promise<Response>
export type Middleware = (request: Request, response: Response, next: NextFunction) => Response | Promise<Response> | undefined | Promise<undefined>