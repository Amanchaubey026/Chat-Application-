const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth.middleware');
const userRouter = express.Router();

//login and signup
userRouter.post('/',registerUser)
userRouter.post('/login',authUser)

//search all users
userRouter.get('/',auth,allUsers)

module.exports = {
    userRouter
}