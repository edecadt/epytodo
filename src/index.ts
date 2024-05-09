import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import './configs/db';
import { notFound } from './middleware/notFound';
import authRoute from './routes/auth.route';
import { authenticateUserSession } from './middleware/auth';
import userRoute from './routes/user.route';
import usersRoute from './routes/users.route';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/', authRoute); // Auth routes

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/register') || req.path.startsWith('/login')) {
        next();
    } else {
        authenticateUserSession(req, res, next).then(() => {});
    }
});

app.use('/user', userRoute); // User routes
app.use('/users', usersRoute); // Users routes

app.use(notFound);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
