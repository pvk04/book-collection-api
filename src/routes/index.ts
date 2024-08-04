import { Router } from "express";
import { userRouter } from "./users";
import { bookRouter } from "./books";

export const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/books", bookRouter);
