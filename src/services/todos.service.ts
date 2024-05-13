import connection from '../configs/db';
import { RowDataPacket } from 'mysql2';

export const getUserTodosById = async (userId: number): Promise<RowDataPacket | null> => {
    try {
        const [rows] = await connection.execute(
            'SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE user_id = ?',
            [userId],
        );

        return rows as RowDataPacket;
    } catch (error) {
        throw error;
    }
};

export const getAllTodos = async (): Promise<RowDataPacket | null> => {
    try {
        const [rows] = await connection.execute(
            'SELECT id, title, description, created_at, due_time, user_id, status FROM todo',
        );

        return rows as RowDataPacket;
    } catch (error) {
        throw error;
    }
};

export const getIdTodos = async (TodoId: number): Promise<RowDataPacket | null> => {
    try {
        const [rows] = await connection.execute('SELECT * FROM todo WHERE id = ?', [TodoId]);

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