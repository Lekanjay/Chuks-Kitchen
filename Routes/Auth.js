const express = require("express");
const { passport } = require("../Authorization/Auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = express.Router();

authRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  },
);
authRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    const token = jwt.sign(
      { email: req.user.email, role: req.user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.json({
      message: "Login successful",
      token,
      user: req.user,
    });
  },
);

module.exports = { authRouter };
