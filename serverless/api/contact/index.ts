import type { VercelRequest, VercelResponse } from "@vercel/node";
import Contact from "../../models/contact";
import dbConnect from "../../dbConnect";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      res
        .status(405)
        .json({ status: res.statusCode, message: "Method not allowed." });
      return;
    }
    await dbConnect();
    const email = req.body?.email;
    const subject = req.body?.subject;
    const message = req.body?.message;

    if (!email || !email.length) {
      return res
        .status(400)
        .json({ status: res.statusCode, message: "Email is missing." });
    }

    if (!subject || !subject.length) {
      return res
        .status(400)
        .json({ status: res.statusCode, message: "Subject is missing." });
    }

    if (!message || !message.length) {
      return res
        .status(400)
        .json({ status: res.statusCode, message: "Message is missing." });
    }

    const contactData = await Contact.create({ email, subject, message });

    await contactData.save();
    res
      .status(200)
      .json({ status: res.statusCode, message: "Successfully sent message." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
