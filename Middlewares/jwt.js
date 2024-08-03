const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  // check req headers contains authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "TOKEN NOT FOUND" });
  }
  //extract the jwt token from headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "UNATHORIZED" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "INVALID TOKEN" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 86400 });
};

module.exports = { jwtMiddleware, generateToken };
