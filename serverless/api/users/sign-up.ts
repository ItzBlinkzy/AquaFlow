import type { VercelRequest, VercelResponse } from "@vercel/node";
import dbConnect from "../../dbConnect";
import User from "../../models/user";
const bcrypt = require("bcrypt");

export default async function SignUp(req: VercelRequest, res: VercelResponse) {
  try {
    await dbConnect();
    const firstName = req.body?.firstName;
    const lastName = req.body?.lastName;
    const userEmail = req.body?.email;
    const password = req.body?.password;
    const emailRegex = /^\S+@\S+\.\S+$/;

    console.log("Signing up!");
    console.log(
      { email: userEmail },
      "Email matches regex?: ",
      emailRegex.test(userEmail)
    );

    if (!firstName || !firstName.length) {
      return res.status(400).json({
        status: res.statusCode,
        message: "First name is missing from request",
      });
    }

    if (!lastName || !lastName.length) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Last name is missing from request",
      });
    }

    if (!userEmail || !userEmail.length) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Email is missing from request",
      });
    }

    if (!emailRegex.test(userEmail)) {
      return res
        .status(400)
        .json({ status: res.statusCode, message: "Invalid email" });
    }

    if (!password || !password.length) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Password is missing from request",
      });
    }

    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email: userEmail,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      status: res.statusCode,
      message: "Registration successful",
      email: userEmail,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: res.statusCode, message: "Internal server error" });
  }
}
