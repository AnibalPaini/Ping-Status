import mongosse from "mongoose";

const userSchema = mongosse.Schema({
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, required: true, enum: ["superadmin","admin", "visor"] },
});

const userModel = mongosse.model("users", userSchema);
export default userModel;
