const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(cors());
const corsOptions = {
  origin: "*",
  credential: true,
};
app.use(cors(corsOptions));


const connectDB= async()=>{
    
}