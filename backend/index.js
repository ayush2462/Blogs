const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.js");
const postRoute = require("./routes/post.js");
const authRoute = require("./routes/auth.js");
const commentRoute = require("./routes/comments.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "/images")));

const corsOptions = {
  origin: "*",
  credentials: true,
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

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/comments", commentRoute);

// Upload images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.img);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
