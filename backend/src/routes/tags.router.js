import { Router } from "express";
import { authenticate, authorization } from "../utils/utils.js";
import {
  postTagsController,
  getTagsController,
  getTagsByIdController,
  deleteTagsController,
} from "../controllers/tags.controller.js";

const tagsRouter = Router();

tagsRouter.get("/", authenticate, getTagsController);
tagsRouter.get("/:tid", authenticate, getTagsByIdController);
tagsRouter.post(
  "/",
  authenticate,
  authorization("admin", "superadmin"),
  postTagsController
);
tagsRouter.delete(
  "/:tid",
  authenticate,
  authorization("admin", "superadmin"),
  deleteTagsController
);

export default tagsRouter;
