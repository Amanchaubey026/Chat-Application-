const express = require("express");
const { chats } = require("./data/dummyData");
const app = express();
const colors =require('colors')
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { connectionToDB } = require("./config/db.config");
const { userRouter } = require("./routes/userRoutes.routes");
const { notFound, errorHandler } = require("./middlewares/errorHandler.middleware");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server up");
});

app.use('/api/user',userRouter)
// app.use(notFound);
// app.use(errorHandler)

app.listen(PORT, async () => {
  try {
    connectionToDB();
    console.log(`server running on port http://localhost:${PORT}`.yellow.bold);
  } catch (error) {
    console.log(error);
  }
});
