import type { VercelRequest, VercelResponse } from "@vercel/node";
import dbConnect from "../../dbConnect";
import authenticateToken from "../_middlewares/authToken";
import User from "../../models/user";
import { customAlphabet } from "nanoid";

const alphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
const nanoid = customAlphabet(alphabet, 11);

export default async function createBooking(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method !== "POST") {
      res
        .status(405)
        .json({ status: res.statusCode, message: "Method not allowed." });
      return;
    }
    await dbConnect();
    const authUser = await authenticateToken(req, res);
    if (!authUser?.email) {
      return;
    }
    const userEmail = authUser.email;
    const dateNow = new Date();

    const user = await User.findOne({ email: userEmail }).exec();

    const generatedId = nanoid();
    const workshopDate = new Date(req.body.workshopDate);

    const userData = {
      ...req.body,
      bookingId: generatedId,
      createdAt: dateNow,
      updatedAt: dateNow,
      workshopDate,
    };
    user.bookings.push(userData);

    await user.save();
    res.status(200).json({
      status: res.statusCode,
      message: "Successfully stored details to database.",
      userData,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: res.statusCode, message: "Internal Server Error" });
  }
}
