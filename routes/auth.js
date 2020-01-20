const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken")
const config = require('config')

router.post(
  "/register",
  [
    check("email", "Email is incorrect").isEmail(),
    check("password", "Password is incorrect").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Wrong credentials (register)", errors: errors.array() });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({
          message: "User already exists"
        });
      }
      const hashedPassword = await bcrypt.hash(password, 13);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User successfully added" });
    } catch (err) {

      res.status(500).json({
        message: "Something went wrong"
      });
    }
  }
);

router.post("/login",[
    check("email", "Email is incorrect").normalizeEmail().isEmail(),
    check("password", "Enter the correct password").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Bad credentials (login)", errors: errors.array() });
      }
      const {email, password} = req.body;

      const user = await User.findOne({email})

      if (!user){
          return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch){
          return res.status(400).json({ message: "Wrong password"});
      }

      const token = jwt.sign({
          userId: user.id,
      },
        config.get('secret'),
        {expiresIn: '1h'}
      )

      res.json({token, userId: user.id});

    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "Something went wrong"
      });
    }
  }
);

module.exports = router;
