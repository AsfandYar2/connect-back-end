const express = require("express");
const connectDB = require("./config/db");
app = express();

//mongodb connect
connectDB();
// const mongodb = require("./monogodb/monogodb");
// mongodb;

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("welcome devconnector");
});

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/posts", require("./routes/posts"));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
