const Post = require("../models/Post");
const router = require("express").Router();
const bcrypt = require("bcrypt");
// create post
router.post("/", async (req, res) => {
  const newPost = await Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update post
router.post("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if ((post.userId = req.body.userId)) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated successfully");
    } else {
      res.status(403).json("you can update your post only");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete post
// like a post
// get a post
// get timeline posts

module.exports = router;
