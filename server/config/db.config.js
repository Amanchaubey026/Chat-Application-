const mongoose = require('mongoose');
require("dotenv").config()

const connectionToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to the database successfully!`.cyan.underline);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectionToDB
}