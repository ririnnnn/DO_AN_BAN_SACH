const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");
const JwtProvider = require("../providers/JwtProvider");
const dotenv = require("dotenv");

dotenv.config();

const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = regex.test(email);
    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input must is email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "The password is equal confirmPassword",
      });
    }
    const respone = await UserService.createUser(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = regex.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input must is email",
      });
    }
    const respone = await UserService.loginUser(req.body);
    const { refresh_token } = respone;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      samesite: "strict",
      path: "/",
    });
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUserGoogle = async (req, res) => {
  try {
    return res.status(200).json("unimplemented");
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({
        status: "ERROR",
        message: "The user id is required!",
      });
    }

    const response = await UserService.updateUser(userId, req.body);

    if (response.status === "OK") {
      res.status(200).json(response);
    } else {
      res.status(404).json(response);
    }
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The user is required",
      });
    }
    const respone = await UserService.deleteUser(userId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const respone = await UserService.getAllUser();
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getUserDatail = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({
        status: "ERROR",
        message: "The userId is required!",
      });
    }

    const response = await UserService.getUserDetail(userId);

    if (response?.status === "ERROR") {
      res.status(404).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logOutUser = async (req, res) => {
  try {
    return res.status(200).json({
      status: "OK",
      message: "Logout sucessfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyUser = async (req, res) => {
  try {
    const ids = req.body;
    const respone = await UserService.deleteManyUser(ids);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getCountUser = async (req, res) => {
  try {
    const respone = await UserService.getCountUser();
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const response = await UserService.getUser(
      Number(page) || 1,
      Number(limit) || 10
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.params.id;

    if (newPassword !== confirmPassword) {
      res.status(400).json({
        status: "ERROR",
        message:
          "The new password and re-entering the new password must match!",
      });
    }

    const response = await UserService.changePassword(userId, req.body);
    if (response.status === "OK") {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
};

const refreshTokenAPI = async (req, res) => {
  try {
    const refreshTokenFromBody = req.body?.refreshToken;

    if (!refreshTokenFromBody) {
      res.status(401).json({ message: "Unauthorized! (Token not found!)" });
      return;
    }

    const refreshTokenDecoded = await JwtProvider.verifyToken(
      refreshTokenFromBody,
      process.env.REFRESH_TOKEN
    );

    const userInfo = {
      id: refreshTokenDecoded?.id,
      isAdmin: refreshTokenDecoded?.isAdmin,
    };

    const accessToken = await JwtProvider.generateToken(
      userInfo,
      process.env.ACCESS_TOKEN,
      "3d"
    );

    res.status(200).json({ accessToken });
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  logOutUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUserDatail,
  refreshToken,
  refreshTokenAPI,
  deleteManyUser,
  getUser,
  getCountUser,
  changePassword,
};
