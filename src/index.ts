import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import './configs/db';
import { notFound } from './middleware/notFound';
import authRoute from './routes/auth.route';
import { authenticateUserSession } from './middleware/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/', authRoute); // Auth routes

app.use(notFound);

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/register') || req.path.startsWith('/login')) {
        next();
    } else {
        authenticateUserSession(req, res, next);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
