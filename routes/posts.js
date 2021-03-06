const Post = require("../models/Post");
const User = require("../models/User");
const router = require("express").Router();
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
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if ((post.userId = req.body.userId)) {
      await post.deleteOne();
      res.status(200).json("post deleted successfully");
    } else {
      res.status(403).json("you can delete your post only");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been disliked");
    }
  } catch (error) {
    res.status(500).json(err);
  }
});
// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get timeline posts
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((id) => {
        return Post.find({ userId: id });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
