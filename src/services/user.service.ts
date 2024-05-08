import connection from '../configs/db';
import { RowDataPacket } from 'mysql2';

export const getUserInfosById = async (userId: number): Promise<RowDataPacket | null> => {
    try {
        const [rows] = await connection.execute('SELECT * FROM user WHERE id = ?', [userId]);

        if (Array.isArray(rows)) {
            if (rows.length === 1) {
                return rows[0] as RowDataPacket;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

export const getUserInfosByEmail = async (email: string): Promise<RowDataPacket | null> => {
    try {
        const [rows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);

        if (Array.isArray(rows)) {
            if (rows.length === 1) {
                return rows[0] as RowDataPacket;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};
