import {Request, Response} from 'express';
import {hashSync} from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {checkIfUserExist, createUser} from "../services/auth.service";

export async function registerUser(req: Request, res: Response) {
    const { email, name, firstname, password } = req.body;

    if (!email || !name || !firstname || !password)
        return res.status(400).json({ "msg": "Bad parameter" });

    try {
        if (await checkIfUserExist(email))
            return res.status(400).json({ "msg": "Account already exists" });
    } catch (error) {
        return res.status(500).json({ "msg": "Internal server error" });
    }

    const hashedPassword = hashSync(password, 10);

    try {
        if (await createUser(email, name, firstname, hashedPassword)) {
            const secret = process.env.SECRET || 'epytodo_secret';
            const token = jwt.sign({ email }, secret, { expiresIn: '24h' });

            return res.status(201).json({ "token": token });
        }
    } catch (error) {
        return res.status(500).json({ "msg": "Internal server error" });
    }
}
