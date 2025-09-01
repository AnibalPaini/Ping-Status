import { Router } from "express";
import { authorization, authenticate } from "../utils/utils.js";
import {
  getDevicesController,
  postDevicesController,
  putDevicesController,
  delDevicesController,
  pauseDeviceController,
  getDevicesByIdController,
} from "../controllers/device.controller.js";

const deviceRouter = Router();
//CRUD
deviceRouter.get("/", authenticate, getDevicesController);
deviceRouter.post(
  "/",
  authenticate,
  authorization("admin", "superadmin"),
  postDevicesController
);
deviceRouter.put(
  "/:did",
  authenticate,
  authorization("admin", "superadmin"),
  putDevicesController
);
deviceRouter.delete(
  "/:did",
  authenticate,
  authorization("admin", "superadmin"),
  delDevicesController
);
//------------
deviceRouter.get("/:did", authenticate, getDevicesByIdController);

deviceRouter.put(
  "/pause/:did",
  authenticate,
  authorization("admin", "superadmin"),
  pauseDeviceController
);

export default deviceRouter;
