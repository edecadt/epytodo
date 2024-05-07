import connection from '../configs/db';
import { ResultSetHeader } from 'mysql2';
import bcrypt from 'bcryptjs';

export const checkIfUserExist = async (email: string): Promise<boolean> => {
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
};

export const createUser = async (
    email: string,
    name: string,
    firstname: string,
    password: string,
): Promise<boolean> => {
    try {
        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)',
            [email, name, firstname, password],
        );

        return result && result.affectedRows === 1;
    } catch (error) {
        throw error;
    }
};

export const checkUserPassword = async (email: string, password: string): Promise<boolean> => {
    try {
        const [rows] = await connection.execute<ResultSetHeader>('SELECT password FROM user WHERE email = ?', [email]);

        if (Array.isArray(rows) && rows.length === 1) {
            const hashedPassword = rows[0].password;
            return await bcrypt.compare(password, hashedPassword);
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};
