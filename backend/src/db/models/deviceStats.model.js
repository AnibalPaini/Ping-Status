import mongoose from "mongoose";

const deviceStatsSchema = mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "devices", required: true },
  recentPings: [
    {
      status: { type: String, enum: ["UP", "DOWN"] },
      ms:{type: String, default:0},
      timestamp: { type: Date, default: new Date() },
    }
  ],
}, { timestamps: true });

const deviceStatsModel= mongoose.model("deviceStatistics", deviceStatsSchema)

export default deviceStatsModel;