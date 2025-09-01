import tagModel from "../db/models/tag.model.js";
export default class TagsService {
  constructor() {}

  getAll = async () => {
    return await tagModel.find();
  };

  getById = async (id) => {
    return await tagModel.findById(id);
  };

  create = async (datos) => {
    return await tagModel.create(datos);
  };

  delete=async(id)=>{
    return await tagModel.findByIdAndDelete(id)
  }
}
