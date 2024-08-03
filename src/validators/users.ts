import { body } from "express-validator";

export const registerUserValidator = [
	body("username").notEmpty().withMessage("Username is required"),
	body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
	body("email").isEmail().withMessage("Email is invalid"),
];

export const loginUserValidator = [
	body("username").notEmpty().withMessage("Username is required"),
	body("password").notEmpty().withMessage("Password is required"),
];

export const updateUserRoleValidator = [body("role").isInt({ min: 1 }).withMessage("Role is required and must be an integer")];
