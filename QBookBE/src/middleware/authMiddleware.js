const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const JwtProvider = require("../providers/JwtProvider");

dotenv.config();

const isAuthorized = async (req, res, next) => {
  const accessTokenFromHeader = req.headers?.authorization;

  if (!accessTokenFromHeader) {
    res.status(401).json({ message: "Unauthorized! (Token not found!)" });
    return;
  }

  try {
    const accessTokenDecoded = await JwtProvider.verifyToken(
      accessTokenFromHeader.substring("Bearer ".length),
      process.env.ACCESS_TOKEN
    );

    req.JwtDecoded = accessTokenDecoded;

    next();
  } catch (error) {
    if (error?.message?.includes("jwt expired")) {
      res.status(410).json({ message: "Need to refresh token!" });
      return;
    }

    res.status(401).json({ message: "Unauthorized! Please login!" });
  }
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(404).json({
        status: "ERROR",
        message: "The admin authentication check!",
      });
    }
    //const { payload } = user;
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        status: "ERROR",
        message: "The admin authentication",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        status: "ERROR",
        message: "The all user authentication check!",
      });
    }
    const { payload } = user;
    if (user?.isAdmin || user) {
      next();
    } else {
      return res.status(404).json({
        status: "ERROR",
        message: "The all user authentication",
      });
    }
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleware,
  isAuthorized,
};
