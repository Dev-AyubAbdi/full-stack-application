import jwt from "jsonwebtoken";
import User from '../model/task.js'

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "no token provide" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SCRETE);
    req.user = await User.findById(decode.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "invalid or expire token" });
  }
};
