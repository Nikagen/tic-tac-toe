require('dotenv').config();
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import routes from './../routes/index';
import logsMiddleware from './../middlewares/logs.middleware';

const app: Application = express();
const PORT = <string>process.env.SERVER_PORT;
const SECRET_COOKIE = <string>process.env.SECRET_COOKIE;

console.log(PORT)

// cors

app.use((request, response, next) => {
  response.set('Access-Control-Allow-Origin', `http://localhost:3000`);
  response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  response.set('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
  response.set('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(SECRET_COOKIE));

// morgan

app.use(logsMiddleware);

app.use('/api', routes);

app.listen(PORT, () => console.log(`[server] ruunning on port ${PORT}`));