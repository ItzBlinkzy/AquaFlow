const jwt = require("jsonwebtoken");

export default function generateJWT(user) {
  return jwt.sign(
    { email: user.email, firstName: user.firstName, lastName: user.lastName },
    process.env.PRIVATE_KEY,
    { expiresIn: "12h" }
  );
}
