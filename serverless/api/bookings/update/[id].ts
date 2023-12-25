import type { VercelRequest, VercelResponse } from "@vercel/node";
import dbConnect from "../../../dbConnect";
import authenticateToken from "../../_middlewares/authToken";
import User from "../../../models/user";
export default async function updateBooking(
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
    console.log("UPDATE CHECK!");

    if (!authUser?.email) {
      return;
    }
    console.log("Modifying!!");
    console.log(req.body);

    const userEmail = authUser.email;
    const { id: bookingId } = req.query;

    const { name, age, workshopType } = req.body;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res
        .status(404)
        .json({ status: res.statusCode, message: "User not found." });
    }

    if (!bookingId) {
      return res.status(400).json({
        status: res.statusCode,
        message: "No ID sent in the request.",
      });
    }

    const bookingIndex = user.bookings.findIndex(
      (bkg) => bkg.bookingId === bookingId
    );
    const bookingToUpdate = user.bookings[bookingIndex];
    if (bookingIndex === -1) {
      return res
        .status(404)
        .json({ status: res.statusCode, message: "Booking not found." });
    }

    console.log({ bookingIndex, bookingtoUpdate: bookingToUpdate });

    // Set to original value if the value passed is falsy.
    bookingToUpdate.name = name || bookingToUpdate.name;
    bookingToUpdate.age = age || bookingToUpdate.age;
    bookingToUpdate.workshopType = workshopType || bookingToUpdate.workshopType;
    bookingToUpdate.updatedAt = new Date();

    await user.save();

    res.status(200).json({
      status: res.statusCode,
      message: "Successfully updated booking",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: res.statusCode, message: "Internal Server Error" });
  }
}
