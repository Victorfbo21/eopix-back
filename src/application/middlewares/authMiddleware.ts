
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
const jwt = require('jsonwebtoken')

async function authMiddleware(
    request: any,
    response: Response,
    next: NextFunction
): Promise<any> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ message: "Token missing" });
    }

    const tokenArray = authHeader.split(" ");

    if (tokenArray.length !== 2) {
        return response.status(401).json({ message: "Invalid token format" });
    }

    const token = tokenArray[1]

    try {
        const decoded = jwt.verify(token as string, process.env.TOKEN_APP_SECRET ?? "")
        if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
            return response.status(401).json({
                error: true,
                code: "token.invalid",
                message: "Invalid token format or missing userId.",
            });
        }

        const userId = decoded.userId
        const userType = decoded.type

        // if (userType === 'user') {
        //     return response.status(403).json({ data: null, error: true, statusCode: 403, message: "Forbidden" })
        // }

        request.user = {
            id: userId,
            type: userType
        };
        return next();
    } catch (err) {
        return response
            .status(401)
            .json({
                error: true,
                code: "token.expired",
                message: "Token invalid."
            });
    }
}

export { authMiddleware };

