const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const CustomerModel = require("../Models/User.model");
require("dotenv").config();
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // allow access to full request
    },
    async (req, email, password, done) => {
      try {
        // expect name in the request body
        const { name } = req.body;
        const user = await CustomerModel.create({ name, email, password });
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await CustomerModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const passwordValidate = await user.isValidPassword(password);
        if (!passwordValidate) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user, { message: "Login successful" });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { passport, isAdmin };
