import { AppContext, AppRoute, Controller, Middleware, NextFunction, Request, Response, WithAuth } from '../types';
import { routes as userRoutes } from './user.route';
import { Express, Router } from 'express';

const useMiddleware = (h: Controller | Middleware) => {
    return async (request: WithAuth<Request>, response: Response, next: NextFunction) => {
        try {
            const ctx: AppContext = {
                request: request,
                response: response,
                get: request.get,
                headers: request.headers,
                query: request.query as any,
                params: request.params,
                auth: request.auth,
                body: request.body
            }
            const data = await h(ctx);
            if (data) {
                return response.status(data?.status ?? 200).send({ message: data?.message ?? '', data: data?.data, error: data?.error });
            }
            next()
        } catch (err: any) {
            try {
                const { status, message, data, error } = err.message && JSON.parse(err.message);
                if (status || message || data || error) {
                    return response.status(status ?? 500).send({ message, data, error });
                }
                throw err
            } catch (err) {
                return response.status(500).send({ message: 'internal server error', data: null, error: err });
            }
        }
    }
}

export const setupRoutes = (app: Express) => {
    const routes = [...userRoutes];
    const appRouter = Router();
    routes.forEach((r: AppRoute) => {
        console.log(`${r.method} : ${r.endpoint}`)
        const middlewares = r.middlewares.map(m => useMiddleware(m));
        switch (r.method) {
            case 'GET': {
                appRouter.get(r.endpoint, ...middlewares, useMiddleware(r.controller))
                break;
            }
            case 'POST': {
                appRouter.post(r.endpoint, ...middlewares, useMiddleware(r.controller))
                break;
            }
            default: {
                console.log("Invalid route")
                break;
            }
        }
    })

    app.use('/', appRouter);
}