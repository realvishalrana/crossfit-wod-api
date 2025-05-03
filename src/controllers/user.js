const {
  createUser,
  loginUser,
  deleteUserData,
  logoutUser,
  getAllUser,
  getUserDataById,
  resetPassword,
  generateAccessToken, 
  generateRefreshToken, 
  verifyRefreshToken, 
} = require("../services/user");

const getUser = async (req, res) => {
  try {
    const users = await getAllUser();
    return res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserDataById(userId);
    return res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};

const create = async (req, res) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);

    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const userData = req.body;
    const { user, accessToken, refreshToken } = await loginUser(userData);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

const update = (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const user = updateUser(userId, userData);
    res.status(200).json({
      data: user,
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUserData(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};

const logout = async (req, res) => {
  try {
    // await logoutUser(req.token);
    // res.status(200).json({ message: "Logout successful" });
    const userId = req.user._id; 
    await logoutUser(userId); 
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};

const resetPasswordData = async (req, res) => {
  try {
    const userId = req.params.id;
    const newPassword = req.body.password;
    await resetPassword(userId, newPassword);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const { userId } = await verifyRefreshToken(refreshToken);

    const user = await getUserDataById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = generateAccessToken({ id: user._id, email: user.email });
    res.status(200).json({ accessToken: newAccessToken });

  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};


module.exports = {
  getUser,
  getUserById,
  create,
  update,
  deleteUser,
  login,
  logout,
  resetPasswordData,
  refreshToken
};
