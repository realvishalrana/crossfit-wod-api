const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secretKey, options);
};

const getAllUser = async () => {
  const users = await userModel.find({}).select("-password");
  return users;
};

const getUserDataById = async (userId) => {
  const user = await userModel.findById(userId).select("-password");
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

  const token = generateToken({ id: user._id, email: user.email });

  return {
    user: {
      id: user._id,
      email: user.email,
    },
    token,
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

const logoutUser = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  let verifiedJwt;
  try {
    verifiedJwt = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }

  const user = await userModel.findById(verifiedJwt.id);
  if (!user) {
    throw new Error("User not found");
  }

  user.token = null;
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
