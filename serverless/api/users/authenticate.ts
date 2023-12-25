import type { VercelRequest, VercelResponse } from "@vercel/node";
import authenticateToken from "../_middlewares/authToken";
import { IUser } from "../../types";
export default async function authenticate(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const user = await authenticateToken(req, res);

    if (!user?.email) {
      return;
    }
    res.status(200).json({
      status: res.statusCode,
      message: "Verified.",
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
