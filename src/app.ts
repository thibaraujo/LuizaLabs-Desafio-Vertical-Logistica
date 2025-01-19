'use strict';
import 'dotenv/config';
import express from 'express';
import routes from './routes';
import cors from 'cors';
import { errorHandler } from './services/errorHandler';
import database from './services/database';

//* EXPRESS
const app: express.Express = express();

//* DATABASE
function connectionMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  database.connect()
    .then(() => {
      console.log('Database connected');
      next();
    })
    .catch((error) => {
      console.error('Error connecting to database: ', error);
      next(error);
    });
}

app.use(connectionMiddleware);

//* CORS
const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'Referer', 'User-Agent', 'X-KL-Ajax-Request', 'Authorization', 'X-Requested-With', 'Content-Type', 'Access-Control-Allow-Origin', 'Accept'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
};
app.use(cors(options));

//* JSON
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  next();
});
app.use(express.json());

//* ROUTES
app.use('/api', routes);

//* DESABILITANDO O X-POWERED-BY DO EXPRESS
app.disable('x-powered-by');

//* ERROR HANDLERS
app.use(errorHandler);

export default app;