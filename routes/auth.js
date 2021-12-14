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
    res.status(200).json(user);
    console.log("sent!!!!!!");
  } catch (error) {
    console.log("\nERR :\n", error);
  }
  res.send("ok");
});

module.exports = router;
