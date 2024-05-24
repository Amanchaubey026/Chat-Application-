const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel.schema");
const { generateToken } = require("../config/generateToken.config");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exist");
  }
  const user = await User.create({ name, email, password, picture });

  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.send(400);
    throw new Error("Failed to Register the User");
  }
});

const authUser = asyncHandler(async (req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.pic,
            token: generateToken(user._id),
        })
    }else{
        res.status(401);
        throw new Error("Invalid Email or Password")
    }
});

module.exports = {
  registerUser,
  authUser,
};
