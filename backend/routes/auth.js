const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("Wrong credentials, User Not Found");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      res.status(401).json("Wrong Password");
    }
    const token = jwt.sign(
      { _id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expireIn: "3d" }
    );
    const { password, ...info } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Logout
router.get("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logout Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
// Refetch Route
router.get("/refetch", async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (error, data) => {
    if (error) {
      return res.status(401).json(error);
    }
    res.status(200).json(data);
  });
});

module.exports = router;
