import type { VercelRequest, VercelResponse } from "@vercel/node";
import clearJwtToken from "../../utils/clearJwtToken";

export default async function SignOut(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res
      .status(405)
      .json({ status: res.statusCode, message: "Method not allowed." });
    return;
  }
  await clearJwtToken(req, res);
  res.json({ status: res.statusCode, message: "Successfully signed out." });
}
