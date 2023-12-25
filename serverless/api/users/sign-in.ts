import type { VercelRequest, VercelResponse } from "@vercel/node";
import dbConnect from "../../dbConnect";
import User from "../../models/user";
const bcrypt = require("bcrypt");
import generateJWT from "../_middlewares/genToken";
import cookie from "cookie";
import path from "path";

export default async function SignIn(req: VercelRequest, res: VercelResponse) {
  await dbConnect();
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email || !email.length) {
    return res
      .status(400)
      .json({ status: res.statusCode, message: "Email is missing." });
  }

  if (!password || !password.length) {
    return res
      .status(400)
      .json({ status: res.statusCode, message: "Password is missing." });
  }

  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, message: "Incorrect email or password." });
    }

    // This is a promise do not omit the await.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: 401, message: "Incorrect email or password." });
    }

    // If the username and password are valid, generate a JWT token
    const token = generateJWT(user);
    const serializedCookie = cookie.serialize("jwtToken", token, {
      httpOnly: true,
      path: "/",
    });

    res.setHeader("Set-Cookie", serializedCookie);

    console.log(user);

    res.status(200).json({
      status: res.statusCode,
      message: "Login successful",
      email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
