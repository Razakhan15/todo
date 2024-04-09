const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = {
  createAccessToken,
};
