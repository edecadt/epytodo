import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
};

const connection = mysql.createConnection(dbConfig);

const connectToDatabase = async () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject(err);
            } else {
                console.log('Connected to database');
                resolve(0);
            }
        });
    });
};

connectToDatabase()
    .catch((err) => {
        console.error('Error connecting to database: ', err);
    });

export default connection;
