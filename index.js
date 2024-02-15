const express = require("express");
require("dotenv").config();
const { initDB } = require("./src/init/InitDb");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const path = require("path");
app.use(cookieParser());
app.use(express.json());

// imported routes
const userRouter = require("./src/routes/user.route");
const authRouter = require("./src/routes/auth.route");
const listingRouter = require("./src/routes/listing.route");

// rotues
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

initDB().then(() => {
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
});
