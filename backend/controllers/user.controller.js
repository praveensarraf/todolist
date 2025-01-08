import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, fullName, password } = req.body;

    if (!username || !fullName || !password) {
      return res.status(400).json({
        message: "Please enter all fields!",
        success: false,
      });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        message:
          "User already exists with this username. Please try another one!",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      fullName,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully. Please login to continue!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Please enter both username and password!",
        success: false,
      });
    }

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password!",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect Email or Password. Please try again!",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
      fullName: user.fullName
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.fullName}!`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "No token found. User not logged in.",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const fullName = decoded.fullName;

    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: `Logged out successfully. Goodbye, ${fullName.split(' ')[0]}!`,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
