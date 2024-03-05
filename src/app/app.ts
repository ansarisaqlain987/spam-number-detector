import express, {Express} from 'express';
import morgan from 'morgan';
import { errorMiddleware, defaultMiddleware } from './middlewares';
const app: Express = express();

// application level middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'))


// route handlers

// handlers
app.use(defaultMiddleware);
app.use(errorMiddleware);

export const APP = app;