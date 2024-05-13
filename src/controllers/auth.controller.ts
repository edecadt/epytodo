import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { checkIfUserExist, checkUserPassword, createUser } from '../services/auth.service';
import { getUserInfosByEmail } from '../services/users.service';

export const registerUser = async (req: Request, res: Response) => {
    const { email, name, firstname, password } = req.body;

    if (!email || !name || !firstname || !password) return res.status(400).json({ msg: 'Bad parameter' });

    try {
        if (await checkIfUserExist(email)) return res.status(400).json({ msg: 'Account already exists' });
    } catch (error) {
        console.log("caca");
        return res.status(500).json({ msg: 'Internal server error' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const userId = await createUser(email, name, firstname, hashedPassword);
        if (userId != null) {
            const secret = process.env.SECRET || 'secret';
            const token = jwt.sign(
                {
                    email: email,
                    id: userId,
                    name: name,
                    firstname: firstname,
                },
                secret,
                { expiresIn: '24h' },
            );

            return res.status(201).json({ token: token });
        } else {
            console.log("caca1");
            return res.status(500).json({ msg: 'Internal server error' });
        }
    } catch (error) {
        console.log("caca2");
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ msg: 'Bad parameter' });

    try {
        if (!(await checkIfUserExist(email))) return res.status(400).json({ msg: 'Not found' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }

    try {
        if (await checkUserPassword(email, password)) {
            const secret = process.env.SECRET || 'secret';
            const userInfos = await getUserInfosByEmail(email);
            const token = jwt.sign(
                {
                    email: email,
                    id: userInfos?.id,
                    name: userInfos?.name,
                    firstname: userInfos?.firstname,
                },
                secret,
                { expiresIn: '24h' },
            );

            return res.status(200).json({ token: token });
        }
        return res.status(400).json({ msg: 'Invalid Credentials' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
};
