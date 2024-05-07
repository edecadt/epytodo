import connection from '../configs/db';
import { ResultSetHeader } from 'mysql2';

export async function checkIfUserExist(email: string): Promise<boolean> {
    try {
        const [rows] = await connection.execute<ResultSetHeader>('SELECT * FROM user WHERE email = ?', [email]);

        if (Array.isArray(rows)) {
            return rows.length > 0;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

export async function createUser(email: string, name: string, firstname: string, password: string): Promise<boolean> {
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      'INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)',
      [email, name, firstname, password],
    );

    return result && result.affectedRows === 1;
  } catch (error) {
    throw error;
  }
}
