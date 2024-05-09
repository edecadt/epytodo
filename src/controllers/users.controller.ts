import { Request, Response } from 'express';
import {
    deleteUserById as deleteUserByIdInDb,
    getUserInfosByEmail,
    getUserInfosById,
    updateUserById as updateUserByIdInDb,
} from '../services/users.service';
import bcrypt from 'bcryptjs';

export const getUserInfoByIdOrEmail = async (req: Request, res: Response) => {
    const idOrEmail = req.params.idOrEmail;

    const isId = !isNaN(parseInt(idOrEmail));

    if (isId) {
        const userInfos = await getUserInfosById(parseInt(idOrEmail));

        if (!userInfos) {
            return res.status(404).json({ msg: 'Not found' });
        }
        return res.status(200).json({
            id: userInfos.id,
            email: userInfos.email,
            password: userInfos.password,
            created_at: userInfos.created_at,
            firstname: userInfos.firstname,
            name: userInfos.name,
        });
    } else {
        const userInfos = await getUserInfosByEmail(idOrEmail);

        if (!userInfos) {
            return res.status(404).json({ msg: 'Not found' });
        }
        return res.status(200).json({
            id: userInfos.id,
            email: userInfos.email,
            password: userInfos.password,
            created_at: userInfos.created_at,
            firstname: userInfos.firstname,
            name: userInfos.name,
        });
    }
};

export const deleteUserById = async (req: Request, res: Response) => {
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
