import cookie from "cookie";

export default async function clearJwtToken(req, res) {
  // Clear the "jwtToken" cookie by setting an expiration date in the past
  const clearCookieOptions = {
    expires: new Date(0),
    httpOnly: true,
    path: "/",
    sameSite: "None", 
    secure: true,
  };

  const clearCookieHeader = cookie.serialize(
    "jwtToken",
    "",
    clearCookieOptions
  );

  // Set the 'Set-Cookie' header in the HTTP response
  res.setHeader("Set-Cookie", clearCookieHeader);
}
