import type { NextFunction, Request, Response } from "express";
import { JWT_PASSWORD } from './config.js'; 
import jwt from "jsonwebtoken";

export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers["authorization"];

    if (!header) {
        return res.status(401).json({ message: "No header" });
    }

    const token = header; // ✅ extract token correctly

    try {
        const decoded = jwt.verify(token as string, JWT_PASSWORD);

        //@ts-ignore
        req.userId = decoded.id;

        next();
    } catch (err) {
        return res.status(403).json({
            message: "You are not logged in",
            error:err,
            tokens:header
        });
    }
};