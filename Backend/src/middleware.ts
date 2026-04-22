import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const JWT_SECRET ="asdfghjklqwertyuiopzxcvbnm64fdgdfsgd5g4s65g4sd5f4g5g4s54"
    const header = req.headers["authorization"];
    
    if (!header) {
        return res.status(401).json({ message: "No header" });
    }
    const token = header;

    try {
        const decoded = jwt.verify(token as string, JWT_SECRET);

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