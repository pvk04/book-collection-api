import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as userService from "../services/users";

const secretKey = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
	const { username, password, email } = req.body;
	try {
		const user = await userService.registerUser(username, password, email);
		res.status(201).json(user);
	} catch (error) {
		const err = error as Error;
		res.status(400).json({ error: err.message });
	}
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	try {
		const user = await userService.loginUser(username, password);
		const token = jwt.sign({ userId: user.id, role: user.role }, secretKey!, { expiresIn: "1h" });

		res.json({ token });
	} catch (error) {
		const err = error as Error;
		res.status(401).json({ error: err.message });
	}
};

export const updateRole = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { role } = req.body;
	try {
		const user = await userService.updateUserRole(Number(id), role);
		res.json(user);
	} catch (error) {
		const err = error as Error;
		res.status(400).json({ error: err.message });
	}
};

export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await userService.getCurrentUser(req.user!.userId);
		res.json(user);
	} catch (error) {
		const err = error as Error;
		res.status(404).json({ error: err.message });
	}
};
