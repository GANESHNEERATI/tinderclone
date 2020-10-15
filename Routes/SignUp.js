import express from "express";
import userModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../Middleware/Requiredlogin.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ error: "please provide all required fields" });
  } else {
    const userEmail = await userModel.findOne({ email: email });
    if (userEmail) {
      return res
        .status(400)
        .json({ error: "user alredy exist with that email" });
    }

    //Hash the password before we store in DB
    //first we need to generate salt
    const salt = await bcrypt.genSalt(10);
    //Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    try {
      const SaveUser = await user.save();
      res.json("signup successfully");
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.post("/Signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "please provide all required fields" });
  } else {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(422)
        .json({ error: "user does not exist with that email id or password" });
    }

    //checking password is correct
    const validpass = await bcrypt.compare(password, user.password);

    if (!validpass) return res.status(422).json("Invalid password or email");

    //creating and sign in jwt token

    const token = jwt.sign({ _id: user._id }, process.env.SEC_KEY);

    res.json({
      token,
      user1: { _id: user._id, email: user.email, name: user.name },
    });
  }
});

export default router;
