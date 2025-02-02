"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "Unauthorized" });
    }
    next();
};
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
