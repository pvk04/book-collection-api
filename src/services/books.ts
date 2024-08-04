import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBook = async (title: string, author: string, publicationDate: Date, genres: string[]) => {
	const book = await prisma.book.create({
		data: {
			title,
			author,
			publicationDate,
			genres,
		},
	});
	return book;
};

export const getBooks = async () => {
	const books = await prisma.book.findMany();
	return books;
};

export const getBookById = async (id: number) => {
	const book = await prisma.book.findUnique({
		where: { id },
	});
	if (!book) {
		throw new Error("Book not found");
	}
	return book;
};

export const updateBook = async (
	id: number,
	data: {
		title?: string;
		author?: string;
		publicationDate?: Date;
		genres?: string[];
	}
) => {
	const book = await prisma.book.findUnique({
		where: { id },
	});

	if (!book) {
		throw Error("Book not found");
	}

	return prisma.book.update({
		where: { id },
		data: {
			title: data.title ?? book.title,
			author: data.author ?? book.author,
			publicationDate: (data.publicationDate && new Date(data.publicationDate)) ?? book.publicationDate,
			genres: data.genres ?? book.genres,
		},
	});
};

export const deleteBook = async (id: number) => {
	const book = await prisma.book.findUnique({
		where: { id },
	});

	if (!book) {
		throw Error("Book not found");
	}

	return await prisma.book.delete({
		where: { id },
	});
};
