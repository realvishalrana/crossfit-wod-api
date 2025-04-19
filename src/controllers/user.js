const {
  createUser,
  loginUser,
  deleteUserData,
  logoutUser,
  getAllUser,
  getUserDataById,
  resetPassword
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
    const { user, token } = await loginUser(userData);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
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
    console.log("userId: ", userId);
    const user = await deleteUserData(userId);
    res.status(200).json({
      data: user,
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};

const logout = async (req, res) => {
  try {
    await logoutUser(req.token);
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

module.exports = {
  getUser,
  getUserById,
  create,
  update,
  deleteUser,
  login,
  logout,
  resetPasswordData
};
