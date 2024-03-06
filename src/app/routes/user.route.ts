import { controllers } from "../controllers";
import { AppRoute } from "../types";

export const routes: AppRoute[] = [
    {
        method: 'POST',
        endpoint: '/login',
        middlewares: [],
        controller: controllers.user.login
    },
    {
        method: 'POST',
        endpoint: '/user',
        middlewares: [],
        controller: controllers.user.registerUser
    }
]