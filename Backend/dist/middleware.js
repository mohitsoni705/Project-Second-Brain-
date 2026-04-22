import jwt from "jsonwebtoken";
export const UserMiddleware = (req, res, next) => {
    const JWT_SECRET = "asdfghjklqwertyuiopzxcvbnm64fdgdfsgd5g4s65g4sd5f4g5g4s54";
    const header = req.headers["authorization"];
    if (!header) {
        return res.status(401).json({ message: "No header" });
    }
    const token = header;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
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