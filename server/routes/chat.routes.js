const express = require('express');
const { auth } = require('../middlewares/auth.middleware');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chat.controller');
const chatRouter = express.Router();

chatRouter.get('/',auth,fetchChats);
chatRouter.post('/',auth,accessChat);
chatRouter.post('/group',auth,createGroupChat);
chatRouter.put('/rename',auth,renameGroup);
chatRouter.put('/groupadd',auth,addToGroup);
chatRouter.put('/groupremove',auth,removeFromGroup);

module.exports = {
    chatRouter
}