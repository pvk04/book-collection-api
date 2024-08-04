import { Request, Response } from "express";
import * as bookService from "../services/books";

export const createBook = async (req: Request, res: Response) => {
	const { title, author, publicationDate, genres } = req.body;

	try {
		const book = await bookService.createBook(title, author, new Date(publicationDate), genres);
		res.status(201).json(book);
	} catch (error) {
		const err = error as Error;
		res.status(500).json({ error: err.message });
	}
};

export const getBooks = async (req: Request, res: Response) => {
	try {
		const books = await bookService.getBooks();
		res.json(books);
	} catch (error) {
		const err = error as Error;
		res.status(500).json({ error: err.message });
	}
};

export const getBookById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const book = await bookService.getBookById(Number(id));
		res.json(book);
	} catch (error) {
		const err = error as Error;
		res.status(404).json({ error: err.message });
	}
};

export const updateBook = async (req: Request, res: Response) => {
	try {
		const book = await bookService.updateBook(Number(req.params.id), req.body);
		res.json(book);
	} catch (error) {
		const err = error as Error;
		res.status(500).json({ error: err.message });
	}
};

export const deleteBook = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const book = await bookService.deleteBook(Number(id));
		res.json(book);
	} catch (error) {
		const err = error as Error;
		res.status(404).json({ error: err.message });
	}
};
