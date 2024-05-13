import { Request, Response } from 'express';
import { getAllTodos, getIdTodos } from '../services/todos.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const getAllUsersTodos = async (req: Request, res: Response) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const allTodos = await getAllTodos();

    if (!allTodos) {
        return res.status(500).json({ msg: 'Internal server error' });
    }

    res.status(200).json(allTodos);
};

export const getTodosById = async (req: Request, res: Response) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token: string = tokenHeader.split(' ')[1];

    const decoded = jwt.decode(token) as { id: number };

    if (!decoded) {
        return res.status(401).json({ msg: 'Invalid token format' });
    }

    const TodoId = await getIdTodos(decoded.id);

    if (!TodoId) {
        return res.status(500).json({ msg: 'Internal server error' });
    }

    res.status(200).json(TodoId);
};

export const postTodos = async (req: Request, res: Response) => {
    const { title, description, due_time, user_id, status } = req.body;

    if (!title || !description || !due_time || !user_id) return res.status(400).json({ msg: 'Bad parameter' });

    try {
        const newTodo = await createTodo(title, description, due_time, user_id, status);
        if (newTodo != null) {
            return res.status(201).json(newTodo);
        } else {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

export const deleteTodosById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }

    const userInfos = await getUserInfosById(userId);

    if (!userInfos) {
        return res.status(404).json({ msg: 'Not found' });
    }

    if (!(await deleteUserByIdInDb(userId))) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
    return res.status(200).json({ msg: `Successfully deleted record number : ${userId}` });
};

export const updateUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }

    const userInfos = await getUserInfosById(userId);

    if (!userInfos) {
        return res.status(404).json({ msg: 'Not found' });
    }

    const { email, name, firstname, password } = req.body;

    if (!email || !name || !firstname || !password) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    if (!(await updateUserByIdInDb(userId, email, name, firstname, hashedPassword))) {
        return res.status(500).json({ msg: 'Internal server error' });
    }

    const userInfosUpdated = await getUserInfosById(userId);

    return res.status(200).json({
        id: userInfosUpdated?.id,
        email: userInfosUpdated?.email,
        password: userInfosUpdated?.password,
        created_at: userInfosUpdated?.created_at,
        firstname: userInfosUpdated?.firstname,
        name: userInfosUpdated?.name,
    });
};
