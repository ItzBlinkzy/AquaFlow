import type { VercelRequest, VercelResponse } from "@vercel/node";
import dbConnect from "../../../dbConnect";
import authenticateToken from "../../_middlewares/authToken";
import User from "../../../models/user";

export default async function deleteBookingById(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    console.log(req.method);
    // Has to be a GET request due to this error I'm encountering with vercel and axios.
    // RequestContentLengthMismatchError: Request body length does not match content-length header
    if (req.method !== "GET") {
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
    const { id: bookingId } = req.query;

    if (!bookingId) {
      return res.status(400).json({
        status: res.statusCode,
        message: "No ID sent in the request.",
      });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res
        .status(404)
        .json({ status: res.statusCode, message: "User not found." });
    }

    const bookingIndex = user.bookings.findIndex(
      (bkg) => bkg.bookingId === bookingId
    );

    if (bookingIndex === -1) {
      return res
        .status(404)
        .json({ status: res.statusCode, message: "Booking ID not found." });
    }

    user.bookings.splice(bookingIndex, 1);

    await user.save();

    res.status(200).json({
      status: res.statusCode,
      message: "Successfully deleted booking.",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: res.statusCode, message: "Internal Server Error" });
  }
}
