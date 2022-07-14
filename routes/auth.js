const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
// register
router.post("/register", async (req, res) => {
  try {
    // generate salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // add user to db
    const user = await newUser.save();
    const { password, ...other } = user._doc;
    res.status(200).json(other);
    console.log("sent!!!!!!");
  } catch (error) {
    console.log("\nERR :\n", error);
  }
  res.send("ok");
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("invalid password");
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {}
});

module.exports = router;
