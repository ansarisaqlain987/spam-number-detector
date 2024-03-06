import { Request as ERequest, Response as EResponse, NextFunction as ENextFunction } from 'express';

export type Request = ERequest;
export type Response = EResponse;
export type NextFunction = ENextFunction;
export type WithAuth<T> = T & { auth?: any }

export type AppRoute = {
    method: 'GET' | 'POST',
    endpoint: string,
    middlewares: Middleware[],
    controller: Controller
}

export type AppContext<T=any> = {
    request: WithAuth<Request>,
    response: Response,
    get: (string) => string | undefined,
    auth: any,
    headers: {[key: string]: string | string[] | undefined},
    query: {[key: string]: string | string[] | undefined},
    params: {[key: string]: string},
    body: T
}

export type ControllerResponse = {
    status?: number,
    message?: string,
    data?: any,
    error?: any,
}

export type Controller = (ctx: AppContext) => ControllerResponse | Promise<ControllerResponse>
export type Middleware = (ctx: AppContext) => ControllerResponse | Promise<ControllerResponse> | undefined | Promise<undefined>