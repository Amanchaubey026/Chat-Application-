const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel.schema");
require("dotenv").config();

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
    //   console.log("Token found:", token); // Log token for debugging purposes
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log("Decoded token:", decoded); // Log decoded token for debugging purposes
      req.user = await User.findById(decoded.id).select("-password");
      
      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }

      next();
    } catch (error) {
    //   console.error("Token verification failed:", error); // Log the error for debugging purposes
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = {
  auth,
};
