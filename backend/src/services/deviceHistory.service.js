import deviceHistoryModel from "../db/models/deviceHistory.model.js";
export default class DeviceHistoryService {
  constructor() {}

  findById = async (id) => {
    return await deviceHistoryModel.find({ deviceId: id }).sort({ time: 1 });
  };
  delete = async (id) => {
    return await deviceHistoryModel.deleteMany({ deviceId: id });
  };
  update = async (id, data) => {
    return await deviceHistoryModel.findByIdAndUpdate(id, data, { new: true });
  };

  deleteHistoryByIdDevice = async (id, data) => {
    return await deviceHistoryModel.updateOne({ deviceId: id }, data, { new: true });
  };
}
