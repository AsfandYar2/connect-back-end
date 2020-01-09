const jwt = require("jsonwebtoken");

const SECRET = "MY_SECRET_KEY";

module.exports = function(req, res, next) {
  // Gettoken from Header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No  token authorizathion denied" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    // console.error(err.message);
    res.status(401).json({ msg: "token is not valid" });
  }
};
