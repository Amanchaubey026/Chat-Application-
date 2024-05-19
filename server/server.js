const express = require("express");
const { chats } = require("./data/dummyData");
const app = express();
const colors =require('colors')
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { connectionToDB } = require("./config/db.config");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server up");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
  // console.log(req.params.id);
  const singlechat = chats.find((c) => c._id === req.params.id);
  res.send(singlechat);
});

app.listen(PORT, async () => {
  try {
    connectionToDB();
    console.log(`server running on port http://localhost:${PORT}`.yellow.bold);
  } catch (error) {
    console.log(error);
  }
});
