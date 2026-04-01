import { JWT_PASSWORD } from './config.js';
import jwt from "jsonwebtoken";
export const UserMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res.status(401).json({ message: "No header" });
    }
    const token = header; // ✅ extract token correctly
    try {
        const decoded = jwt.verify(token, JWT_PASSWORD);
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(403).json({
            message: "You are not logged in",
            error: err,
            tokens: header
        });
    }
};
//# sourceMappingURL=middleware.js.map