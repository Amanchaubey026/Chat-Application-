 const express = require('express');
const { chats } = require('./data/dummyData');
 const app = express();
 require("dotenv").config();
 const PORT = process.env.PORT || 3000;
const cors = require('cors')

app.use(cors());
app.use(express.json());

 app.get('/',(req,res)=>{
    res.send("server up")
 })

 app.get('/api/chat',(req,res)=>{
    res.send(chats)
 })
 app.get('/api/chat/:id',(req,res)=>{
    // console.log(req.params.id);
    const singlechat = chats.find((c)=>c._id ===req.params.id)
    res.send(singlechat)
 })


 app.listen(PORT,()=>{
    console.log(`server running on port http://localhost:${PORT}`);
 })