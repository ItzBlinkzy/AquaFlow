import type { VercelRequest, VercelResponse } from "@vercel/node";
import dbConnect from "../../dbConnect";
import authenticateToken from "../_middlewares/authToken";
import User from "../../models/user";

export default async function viewBookingById(
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

    const { id: bookingId } = req.query;

    const userEmail = user.email;

    if (!bookingId) {
      return res
        .status(400)
        .json({ status: res.statusCode, message: "No ID sent in request." });
    }
    const data = await User.findOne(
      { email: userEmail, "bookings.bookingId": bookingId },
      { "bookings.$": 1 }
    );

    if (!data?.bookings?.length) {
      return res
        .status(404)
        .json({ status: res.statusCode, message: "ID not found." });
    }

    res.status(200).json(data.bookings[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: res.statusCode, message: "Internal Server Error" });
  }
}
