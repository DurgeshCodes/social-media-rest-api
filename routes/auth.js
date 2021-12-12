const User = require("../models/User");

const router = require("express").Router();

// register
router.get("/register", async (req, res) => {
  const user = await new User({
    username: "tony",
    email: "tonydragster69@gmail.com",
    password: "123456",
  });
  await user.save();
  res.send("ok");
});

module.exports = router;
