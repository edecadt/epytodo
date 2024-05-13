import connection from '../configs/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

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
        const [rows] = await connection.execute(
            'SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = ?',
            [TodoId]
        );
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

export const createTodo = async (
    title: string,
    description: string,
    due_time: Date,
    user_id: string,
    status: string,
): Promise<RowDataPacket | null> => {
    try {
        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)',
            [ title, description, due_time, user_id, status],
        );

        if (result && result.affectedRows === 1) {
            const insertedTodo = await getIdTodos(result.insertId);
            return insertedTodo as RowDataPacket;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

export const updateTodoById = async (
    TodoId: number,
    title: string,
    description: string,
    due_time: Date,
    user_id: number,
    status: string,
): Promise<boolean> => {
    try {
        const [result] = await connection.execute<ResultSetHeader>(
            'UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?',
            [title, description, due_time, user_id, status, TodoId],
        );

        return result.affectedRows === 1;
    } catch (error) {
        throw error;
    }
};

export const deleteTodosById = async (TodoId: number): Promise<boolean> => {
    try {
        const [result] = await connection.execute<ResultSetHeader>('DELETE FROM todo WHERE id = ?', [TodoId]);

        return result.affectedRows === 1;
    } catch (error) {
        throw error;
    }
};
