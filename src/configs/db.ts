import mysql, {Pool} from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection: Pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default connection;
