const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  updatePassword,
} = require("../controllers/userRoutesController");

router.post("/signup", createUser);
router.post("/login", login);
router.put("/profile/password", updatePassword);

module.exports = router;
