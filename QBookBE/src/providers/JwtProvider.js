const JWT = require("jsonwebtoken");

const generateToken = async (userInfo, secretSignature, tokenLife) => {
  try {
    return await JWT.sign(userInfo, secretSignature, {
      algorithm: "HS256",
      expiresIn: tokenLife,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const verifyToken = async (token, secretSignature) => {
  try {
    return await JWT.verify(token, secretSignature);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
