import { Router } from "express";
import { authenticate, authorization } from "../utils/utils.js";
import {
  loginController,
  postUserController,
  getUsersController,
  getUserProfileController,
  getUserByIdController,
  putUsersController,
  deleteUsersController,
  logoutController,
  editPasswordController,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController);

userRouter.post(
  "/postUser",
  authenticate,
  authorization("admin", "superadmin"),
  postUserController
);
userRouter.get("/perfil", authenticate, getUserProfileController);

userRouter.get(
  "/users",
  authenticate,
  authorization("admin", "superadmin"),
  getUsersController
);

userRouter.get(
  "/users/:uid",
  authenticate,
  authorization("admin", "superadmin"),
  getUserByIdController
);

userRouter.put(
  "/users/:uid",
  authenticate,
  authorization("admin", "superadmin"),
  putUsersController
);

userRouter.delete(
  "/users/:uid",
  authenticate,
  authorization("admin", "superadmin"),
  deleteUsersController
);

userRouter.put("/users/password", authenticate, editPasswordController);

export default userRouter;
