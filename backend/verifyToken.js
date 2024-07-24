const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
    if (error) {
      return res.status(403).json("Token is invalid");
    }
    req.userId = data._id;
    next();
  });
};
module.exports = verifyToken;
