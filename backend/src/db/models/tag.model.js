import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
  name:{type:String, required:true},
  color:{type:String,enum:["gray", "red", "green", "orange", "purple", "pink", "blue", "yellow"], required:true},
}, { timestamps: true });

const tagModel= mongoose.model("tags", tagSchema)

export default tagModel;