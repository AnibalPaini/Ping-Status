import { Router } from "express";
import { authenticate, authorization } from "../utils/utils.js";
import {
  getDeviceHistoryController,
  deleteDeviceHistoryController,
  deleteDeviceHistoryByIdDeviceController,
} from "../controllers/deviceHistory.controller.js";

const deviceHistoryRouter = Router();

deviceHistoryRouter.get("/:did", authenticate, getDeviceHistoryController);
deviceHistoryRouter.put(
  "/:did",
  authenticate,
  authorization("admin", "superadmin"),
  deleteDeviceHistoryController
);
deviceHistoryRouter.put(
  "/:did/delete",
  authenticate,
  authorization("admin", "superadmin"),
  deleteDeviceHistoryByIdDeviceController
);

export default deviceHistoryRouter;
