const express = require('express');
const { registerUser, authUser } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/',registerUser)
userRouter.post('/login',authUser)

module.exports = {
    userRouter
}