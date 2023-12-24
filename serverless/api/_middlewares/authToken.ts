import { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { IUser } from "../../types";
import clearJwtToken from "../../utils/clearJwtToken";
export default async function authenticateToken(
  req: VercelRequest,
  res: VercelResponse
): Promise<IUser | null> {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.jwtToken;

  console.log({ token });
  if (!token) {
    res.status(401).send("Unauthorized");
    return null;
  }

  try {
    const user: any = jwt.verify(token, process.env.PRIVATE_KEY as string);
    console.log({ user });
    return user;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.log("User token has expired.");
    } else {
      console.error(err);
    }
    await clearJwtToken(req, res);

    return null;
  }
}
