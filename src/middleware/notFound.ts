import { NextFunction, Request, Response } from 'express';

type ErrorNotFound = Error & { status?: number };

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error: ErrorNotFound = new Error('Not Found');
    error.status = 404;
    next(error);
};
