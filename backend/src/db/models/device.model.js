import mongoose from "mongoose";

const DeviceSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    ip: { type: String, required: true },
    isAlive: { type: Boolean, default: false },
    isConnected: { type: Boolean, default: true },
    paused: { type: Boolean, default: false },
    notifications: { type: Boolean, default: true },
    description: { type: String },
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: "tags" }],
    historyRetentionDays: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamp: true }
);

const deviceModel = mongoose.model("devices", DeviceSchema);

export default deviceModel;
