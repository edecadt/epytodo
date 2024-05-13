import connection from '../configs/db';
import { RowDataPacket } from 'mysql2';

export const getUserTodosById = async (userId: number): Promise<RowDataPacket | null> => {
    try {
        const [rows] = await connection.execute('SELECT * FROM todo WHERE user_id = ?', [userId]);

        return rows as RowDataPacket;
    } catch (error) {
        throw error;
    }
};