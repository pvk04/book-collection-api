import { Router } from "express";
import { registerUserValidator, loginUserValidator, updateUserRoleValidator } from "../validators/users";
import { validationHandler } from "../middleware/validationHandler";
import { authenticateJWT, authorizeRole } from "../middleware/auth";
import { register, login, getMe, updateRole } from "../controllers/users";

export const userRouter = Router();

// User routes
userRouter.post("/register", registerUserValidator, validationHandler, register);
userRouter.post("/login", loginUserValidator, validationHandler, login);
userRouter.get("/me", authenticateJWT, getMe);
userRouter.put("/:id/role", authenticateJWT, authorizeRole(2), updateUserRoleValidator, validationHandler, updateRole); // Только администратор
