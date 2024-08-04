import { Router } from "express";
import { createBook, getBooks, getBookById, updateBook, deleteBook } from "../controllers/books";
import { authenticateJWT, authorizeRole } from "../middleware/auth";
import { validateCreateBook, validateUpdateBook, validateBookIdParam } from "../validators/books";
import { validationHandler } from "../middleware/validationHandler";

export const bookRouter = Router();

bookRouter.post("/", authenticateJWT, authorizeRole(2), validateCreateBook, validationHandler, createBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", validateBookIdParam, validationHandler, getBookById);
bookRouter.put("/:id", authenticateJWT, authorizeRole(2), validateUpdateBook, validationHandler, updateBook);
bookRouter.delete("/:id", authenticateJWT, authorizeRole(2), validateBookIdParam, validationHandler, deleteBook);
