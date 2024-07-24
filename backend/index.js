const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const app = express();
dotenv.config();
app.use(express.json())
app.use(cors());
const corsOptions = {
  origin: "*",
  credential: true,
};
app.use(cors(corsOptions));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection established successfully");
  } catch (error) {
    console.log(error);
  }
};
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
