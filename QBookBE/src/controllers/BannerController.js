const BannerService = require("../services/BannerService");

const createBanner = async (req, res) => {
  try {
    const { title, image, description } = req.body;
    if (!title || !image || !description) {
      return res.status(400).json({
        status: "ERROR",
        message: "Title, image, and description are required!",
      });
    }
    const response = await BannerService.createBanner(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const getBannerById = async (req, res) => {
  try {
    const bannerId = req.params.id;

    if (!bannerId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The banner ID is required!",
      });
    }

    const response = await BannerService.getBannerById(bannerId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const data = req.body;

    if (!bannerId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The banner ID is required!",
      });
    }

    const response = await BannerService.updateBanner(bannerId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;

    if (!bannerId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The banner ID is required!",
      });
    }

    const response = await BannerService.deleteBanner(bannerId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

module.exports = {
  createBanner,
  getBannerById,
  updateBanner,
  deleteBanner,
};
