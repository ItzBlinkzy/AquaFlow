const jwt = require("jsonwebtoken");

function generateJWT(user) {
  return jwt.sign(
    { email: user.email, firstName: user.firstName, lastName: user.lastName },
    process.env.PRIVATE_KEY,
    { expiresIn: "12h" }
  );
}

module.exports = {
  generateJWT,
};
