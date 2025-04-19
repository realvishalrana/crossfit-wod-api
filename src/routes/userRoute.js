const expres = require("express");
const {
  create,
  login,
  update,
  deleteUser,
  logout,
  getUser,
  getUserById,
  resetPasswordData,
} = require("../controllers/user");

const router = expres.Router();
const authMiddleware = require("../middleware/auth");
const validate = require("../middleware/validate");
const userValidation = require("../utils/validation/user");

router.post("/", validate(userValidation.userSchema), create);
router.post("/login", validate(userValidation.loginSchema), login);

router.use(authMiddleware);

router.get("/", getUser);
router.get("/:id", getUserById);
router.put("/:id", validate(userValidation.updateSchema), update);
router.delete("/:id", validate(userValidation.deleteSchema), deleteUser);
router.post(
  "/reset-password",
  validate(userValidation.resetPasswordSchema),
  resetPasswordData
);
router.post("/logout", logout);

module.exports = router;
