import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: String,
  email: { String, unique: true },
  password: String,
});

const User = mongoose.model("user", userSchema);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

export default User;
