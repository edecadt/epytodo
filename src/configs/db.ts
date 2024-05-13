import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection: Pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_ROOT_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function checkConnection() {
    let con;
    try {
      con = await connection.getConnection();
      console.log('Connected to the database!');
    } catch (err) {
      console.error('Error connecting to the database:', err);
    } finally {
      if (con) {
        con.release();
      }
    }
  }

checkConnection();
export default connection;
