import { Router } from "express";
import { authenticate } from "../utils/utils.js";
import {
  getDeviceStatController,
  getDevicesPromedios,
  getLastsPings,
} from "../controllers/deviceStats.controller.js";

const deviceStatsRouter = Router();

deviceStatsRouter.get("/:did", authenticate, getDeviceStatController);
deviceStatsRouter.get("/:did/promedios", authenticate, getDevicesPromedios);
deviceStatsRouter.get("/pings/:did", authenticate, getLastsPings);

export default deviceStatsRouter;
