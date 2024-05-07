import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateUserSession(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token , authorization denied' });

    const secret = process.env.SECRET || 'epytodo_secret';

    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Token is not valid' });
        if (!decoded || !decoded.email) return res.status(403).json({ message: 'Token is not valid' });
        next();
    });
}
