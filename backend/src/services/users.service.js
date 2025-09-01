import userModel from "../db/models/user.model.js";

export default class UserService {
  constructor() {}

  getAll = async () => {
    return await userModel.find();
  };
  getById = async (id) => {
    return await userModel.findById(id);
  };
  post = async (datos) => {
    return await userModel.create(datos);
  };
  update = async (id, datos) => {
    return await userModel.findByIdAndUpdate(id, datos, { new: true });
  };
  delete = async (id) => {
    return await userModel.findByIdAndDelete(id);
  };
  findUser = async (user) => {
    return await userModel.findOne({ user: user });
  };
}
