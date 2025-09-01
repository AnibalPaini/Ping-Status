import mongoose from "mongoose";

const DeviceHistorySchema = mongoose.Schema(
  {
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "devices" },
    history: [
      {
        status: { type: String, required: true, enum: ["UP", "DOWN"] },
        message: { type: String },
        time: { type: String, default: new Date() },
      },
    ],
  },
  { timestamp: true }
);

const deviceHistoryModel = mongoose.model(
  "deviceHistorys",
  DeviceHistorySchema
);

export default deviceHistoryModel;
