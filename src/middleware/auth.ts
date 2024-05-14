import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateUserSession = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    const secret = process.env.SECRET || 'secret';

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        if (!decoded.email) {
            return res.status(401).json({ msg: 'Token is not valid' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};
