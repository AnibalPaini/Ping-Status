import deviceStatsModel from "../db/models/deviceStats.model.js";

export default class DeviceStatsService{
    constructor(){}

    getAll=async()=>{
        return await deviceStatsModel.find()
    }
    getById=async(id)=>{
        return await deviceStatsModel.findById(id)
    }
    getByDeviceId=async(deviceId)=>{
        return await deviceStatsModel.findOne({deviceId:deviceId}).populate("deviceId", "paused")
    }
    delete=async(id)=>{
        return await deviceStatsModel.deleteMany({deviceId:id})
    }
}