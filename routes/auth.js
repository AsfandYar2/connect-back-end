const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const SECRET = "MY_SECRET_KEY";

// Modal
const User = require("../modals/User");

// @route GET /users
// @decs Register a user
// @access Public
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

// @route POST /users
// @decs Register a user
// @access Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid Email or Password" });
  }
  //check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Email or Password" });
  }
  const payload = {
    user: { id: user.id }
  };
  let token = await jwt.sign(payload, SECRET, { expiresIn: 360000 });

  await res.send(token);
});

module.exports = router;
