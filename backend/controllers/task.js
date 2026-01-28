import User from "../model/task.js";
import { generateToken } from "../util/generateToken.js";

export const register = async (req, res, next) => {
  try {
    let { name, email, password, role } = req.body;

    email = email.toLowerCase();

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        message: "This email already exists",
      });
    }
    const user = await User.create({ name, email, password, role });
    console.log("User success", user);

    const token = generateToken(user._id);

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  const user = await User.find().sort({ createdAt: -1 });
  res.json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email})

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
   next(error)
  }
};
