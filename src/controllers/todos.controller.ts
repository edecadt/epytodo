import { Request, Response } from 'express';
import { getAllTodos, getIdTodos, createTodo, updateTodoById, deleteTodosById } from '../services/todos.service';
import jwt from 'jsonwebtoken';
import { getUserInfosById } from '../services/users.service';

export const getAllUsersTodos = async (req: Request, res: Response) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const token: string = tokenHeader.split(' ')[1];

    const decoded = jwt.decode(token) as { id: number };

    if (!decoded) {
        return res.status(401).json({ msg: 'Invalid token format' });
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
    const TodoId = parseInt(req.params.id);

    if (isNaN(TodoId)) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }
    const TodoInfos = await getIdTodos(TodoId);

    if (!TodoInfos) {
        return res.status(404).json({ msg: 'Not found' });
    }

    res.status(200).json(TodoInfos);
};

export const postTodos = async (req: Request, res: Response) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token: string = tokenHeader.split(' ')[1];

    const decoded = jwt.decode(token) as { id: number };

    if (!decoded) {
        return res.status(401).json({ msg: 'Invalid token format' });
    }

    const { title, description, due_time, user_id, status } = req.body;

    if (!title || !description || !due_time || !user_id)
        return res.status(400).json({ msg: 'Bad parameter' });

    const user_exist = await getUserInfosById(parseInt(user_id));

    if (!user_exist)
        return res.status(400).json({ msg: 'Bad parameter' });


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

export const putTodos = async (req: Request, res: Response) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token: string = tokenHeader.split(' ')[1];

    const decoded = jwt.decode(token) as { id: number };

    if (!decoded) {
        return res.status(401).json({ msg: 'Invalid token format' });
    }

    const TodoId = parseInt(req.params.id);

    if (isNaN(TodoId)) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }

    const TodosInfos = await getIdTodos(TodoId);

    if (!TodosInfos) {
        return res.status(404).json({ msg: 'Not found' });
    }

    const { title, description, due_time, user_id, status } = req.body;

    if (!title || !description || !due_time || !user_id) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }

    const user_exist = await getUserInfosById(parseInt(user_id));

    if (!user_exist)
        return res.status(400).json({ msg: 'Bad parameter' });

    if (!(await updateTodoById(TodoId, title, description, due_time, user_id, status))) {
        return res.status(500).json({ msg: 'Internal server error' });
    }

    const TodoInfosUpdated = await getIdTodos(TodoId);

    if(!TodoInfosUpdated) {
        return res.status(500).json({ msg: 'Internal server error' });
    }

    return res.status(200).json({
        title: TodoInfosUpdated?.title,
        description: TodoInfosUpdated?.description,
        due_time: TodoInfosUpdated?.due_time,
        user_id: TodoInfosUpdated?.user_id,
        status: TodoInfosUpdated?.status,
    });
};

export const deleteTodos = async (req: Request, res: Response) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token: string = tokenHeader.split(' ')[1];

    const decoded = jwt.decode(token) as { id: number };

    if (!decoded) {
        return res.status(401).json({ msg: 'Invalid token format' });
    }

    const TodoId = parseInt(req.params.id);

    if (isNaN(TodoId)) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }

    const TodoInfos = await getIdTodos(TodoId);

    if (!TodoInfos) {
        return res.status(404).json({ msg: 'Not found' });
    }

    if (!(await deleteTodosById(TodoId))) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
    return res.status(200).json({ msg: `Successfully deleted record number : ${TodoId}` });
};
