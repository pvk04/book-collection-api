import { body, param } from "express-validator";

export const validateCreateBook = [
	body("title").notEmpty().withMessage("Title is required"),
	body("author").notEmpty().withMessage("Author is required"),
	body("publicationDate").isISO8601().withMessage("Publication date must be a valid date"),
	body("genres")
		.isArray()
		.withMessage("Genres must be an array")
		.custom((genres) => genres.every((genre: any) => typeof genre === "string"))
		.withMessage("All genres must be strings"),
];

export const validateUpdateBook = [
	body("title").optional().notEmpty().withMessage("Title must be a non-empty string if provided"),
	body("author").optional().notEmpty().withMessage("Author must be a non-empty string if provided"),
	body("publicationDate").optional().isISO8601().withMessage("Publication date must be a valid date if provided"),
	body("genres")
		.optional()
		.isArray()
		.withMessage("Genres must be an array if provided")
		.custom((genres) => genres.every((genre: any) => typeof genre === "string"))
		.withMessage("All genres must be strings if provided"),
];

export const validateBookIdParam = [param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer")];
