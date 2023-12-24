import type { VercelRequest, VercelResponse } from "@vercel/node";

// The template all the serverless functions use.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.json({ message: "Hello World!" });
}
