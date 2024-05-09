import { Request, Response } from 'express';
import { deleteUserById as deleteUserByIdInDb, getUserInfosByEmail, getUserInfosById } from '../services/users.service';

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
