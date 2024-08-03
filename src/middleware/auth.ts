import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth";

const secretKey = process.env.JWT_SECRET || "secret_key";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header("Authorization")?.split(" ")[1];
	if (!token) return res.status(401).json({ error: "Unauthorized" });

	try {
		const decoded = jwt.verify(token, secretKey) as JwtPayload;
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ error: "Invalid token" });
	}
};

export const authorizeRole = (requiredRole: number) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = req.user;

		if (!user || (user.role & requiredRole) !== requiredRole) {
			return res.status(403).json({ error: "Forbidden" });
		}
		next();
	};
};
