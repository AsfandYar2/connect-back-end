const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "MY_SECRET_KEY";

// Modal
const User = require("../modals/User");

// @route POST /users
// @decs Register a user
// @access Public

router.post("/", async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  let user = await User.findOne({
    email
  });
  if (user) {
    return res.status(400).json({
      msg: "user already exists"
    });
  }
  // const avator = gravatar.url(email, {
  //   s: "200",
  //   r: "pg",
  //   d: "mm"
  // });
  user = new User({
    name,
    email,
    // avatar,
    password
  });

  salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  const payload = {
    user: {
      id: user.id
    }
  };
  let token = await jwt.sign(payload, SECRET, {
    expiresIn: 360000
  });

  res.send(token);
});

module.exports = router;