const User = require("../models/user");
const { jwtMiddleware, generateToken } = require("../Middlewares/jwt");

const createUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    const payload = {
      id: response.id,
    };
    const token = generateToken(payload);
    console.log("token is ", token);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Interner server error " });
  }
};

const login = async (req, res) => {
  try {
    const { NID, password } = req.body;
    const user = User.findOne({ NID: NID });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ error: "Invalid NID no or password" });
    }
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed!" });
  }
};

const updatePassword = async (req, res) => {
    
};

module.exports = { createUser, login, updatePassword };
