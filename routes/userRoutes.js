const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { jwtMiddleware, generateToken } = require("../Middlewares/jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);
    console.log("token is ", token);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Interner server error " });
  }
});

module.exports = router;
