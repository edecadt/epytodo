import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import "./config/db"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});