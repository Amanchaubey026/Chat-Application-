const mongoose = require('mongoose');


const messageModel = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    content:{type:String,trim:true},
    chats:{type:mongoose.Schema.Types.ObjectId, ref:"Chat"},
},{
    versionKey:false,
    timestamps:true
})

const Message = mongoose.model("Message",messageModel);

module.exports = {
    Message
}