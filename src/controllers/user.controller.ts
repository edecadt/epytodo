import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserInfosById } from '../services/users.service';
import { getUserTodosById } from '../services/todos.service';
import { formatDate } from '../utils/formatDate';

export const getUserInfos = async (req: Request, res: Response) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token: string = tokenHeader.split(' ')[1];

    const decoded = jwt.decode(token) as { id: number };

    if (!decoded) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }

    const userInfo = await getUserInfosById(decoded.id);

    if (!userInfo) {
        return res.status(500).json({ msg: 'Internal server error' });
    }

    res.status(200).json({
        id: userInfo.id,
        email: userInfo.email,
        password: userInfo.password,
        created_at: formatDate(userInfo.created_at),
        firstname: userInfo.firstname,
        name: userInfo.name,
    });
};

export const getUserTodos = async (req: Request, res: Response) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token: string = tokenHeader.split(' ')[1];

    const decoded = jwt.decode(token) as { id: number };

    if (!decoded) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }

    const userTodos = await getUserTodosById(decoded.id);

    if (!userTodos) {
        return res.status(500).json({ msg: 'Internal server error' });
    }

    res.status(200).json(userTodos);
};
