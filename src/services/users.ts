import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const registerUser = async (username: string, password: string, email: string) => {
	// Проверка уникальности имени пользователя и электронной почты перед созданием
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{ username }, { email }],
		},
	});

	if (existingUser) {
		if (existingUser.username === username) {
			throw new Error("Username is already taken.");
		}
		if (existingUser.email === email) {
			throw new Error("Email is already registered.");
		}
	}

	// Хэширование пароля
	const hashedPassword = await bcrypt.hash(password, 10);

	return await prisma.user.create({
		data: {
			username,
			password: hashedPassword,
			email,
			role: 1, // Default role
		},
	});
};

export const loginUser = async (username: string, password: string) => {
	const user = await prisma.user.findUnique({ where: { username } });
	if (!user) throw new Error("User not found");

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) throw new Error("Invalid password");

	return user;
};

export const updateUserRole = async (id: number, role: number) => {
	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) throw new Error("User not found");

	return await prisma.user.update({
		where: { id },
		data: { role },
	});
};

export const getCurrentUser = async (id: number) => {
	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) throw new Error("User not found");

	return await prisma.user.findUnique({ where: { id } });
};
