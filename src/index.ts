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

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/register') || req.path.startsWith('/login')) {
        next();
    } else {
        authenticateUserSession(req, res, next);
    }
});

app.use(notFound);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
