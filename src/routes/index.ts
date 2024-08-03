import { Router } from "express";
import { userRouter } from "./users";

export const appRouter = Router();

appRouter.use("/users", userRouter);
