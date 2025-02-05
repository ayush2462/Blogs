const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");
const Post = require("./post");
const Comment = require("./comments");

// Create

router.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = newComment(req.body);
    const savedComment = await new Comment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Comment

router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ PostId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
