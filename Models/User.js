import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In a real app, ensure to hash passwords
  role: { type: String, enum: ["admin", "member"], default: "member" },
  registeredAt: { type: Date, default: Date.now },
});

// Check if the model exists to prevent OverwriteModelError
export default mongoose.models.User || mongoose.model("User", UserSchema);
