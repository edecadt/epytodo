import express, {NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import "./configs/db"
import {notFound} from "./middleware/notFound";
import authRoute from "./routes/auth.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/', authRoute); // Auth routes

app.use(notFound);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});