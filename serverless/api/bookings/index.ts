import type { VercelRequest, VercelResponse } from "@vercel/node";
import authenticateToken from "../_middlewares/authToken";
import User from "../../models/user";
import dbConnect from "../../dbConnect";
export default async function viewAllBookings(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method !== "GET") {
      res
        .status(405)
        .json({ status: res.statusCode, message: "Method not allowed." });
      return;
    }
    await dbConnect();
    const user = await authenticateToken(req, res);
    if (!user?.email) {
      return;
    }

    const userEmail = user.email;
    const data = await User.findOne({ email: userEmail })
      .select({ bookings: 1, _id: 0 })
      .exec();

    const allBookings = data?.bookings;
    if (!allBookings) {
      res
        .status(404)
        .json({ status: res.statusCode, message: "No bookings found." });
      return;
    }

    res.status(200).json(allBookings);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: res.statusCode, message: "Internal Server Error" });
  }
}
