import { AppRoute } from '../types';
import { routes as userRoutes } from './user.route';
import { Express, Router } from 'express';

export const setupRoutes = (app: Express) => {
    const routes = [...userRoutes];
    const appRouter = Router();
    routes.forEach((r: AppRoute) => {
        console.log(`${r.method} : ${r.endpoint}`)
        switch (r.method) {
            case 'GET': {
                appRouter.get(r.endpoint, ...r.middlewares, r.controller)
                break;
            }
            case 'POST': {
                appRouter.post(r.endpoint, ...r.middlewares, r.controller)
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