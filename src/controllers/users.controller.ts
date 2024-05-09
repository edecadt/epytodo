import { Request, Response } from 'express';
import { getUserInfosByEmail, getUserInfosById } from '../services/user.service';

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
