const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to generate Access Token
const generateAccessToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: "15m" }; // Short-lived access token
  return jwt.sign(payload, secretKey, options);
};

// Function to generate Refresh Token
const generateRefreshToken = (payload) => {
  const secretKey = process.env.JWT_REFRESH_SECRET;
  const options = { expiresIn: "7d" }; // Long-lived refresh token
  return jwt.sign(payload, secretKey, options);
};

// Function to verify Refresh Token
const verifyRefreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return { userId: decoded.id };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

const getAllUser = async () => {
  const users = await userModel.find({}).select("-password");
  return users;
};

const getUserDataById = async (userId) => {
  const user = await userModel.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const createUser = async (userData) => {
  if (!userData?.email || !userData?.password) {
    throw new Error("Please provide email and password");
  }

  const existingUser = await userModel.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  userData.password = await bcrypt.hash(userData.password, 10);
  userData.fullName = userData.firstName + " " + userData.lastName;
  const user = await userModel.create(userData);
  return user;
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("No user found with this email");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken({ id: user._id, email: user.email });
  const refreshToken = generateRefreshToken({
    id: user._id,
    email: user.email,
  });

  user.refreshToken = refreshToken; // Store refresh token on user model (NOT RECOMMENDED FOR PRODUCTION)
  await user.save();

  return {
    user: {
      id: user._id,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

const updateUser = async (userId, userData) => {
  const user = await userModel.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const deleteUserData = async (userId) => {
  const user = await userModel.findByIdAndDelete(userId);
  if (!user) {
    throw new Error("User not found or already deleted");
  }
  return user;
};

const logoutUser = async (userId) => {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Invalidate refresh token by setting it to null or removing it
  user.refreshToken = null;
  await user.save();
};

const resetPassword = async (userId, newPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  await userModel.findByIdAndUpdate(userId, { password: hashedPassword });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUserData,
  logoutUser,
  getAllUser,
  getUserDataById,
  resetPassword,
};
