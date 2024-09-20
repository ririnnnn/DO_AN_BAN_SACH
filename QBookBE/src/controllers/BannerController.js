const BannerService = require("../services/BannerService");

const createBanner = async (req, res) => {
  try {
    const { desc, activeFrom, activeTo, image } = req.body;
    if (!desc || !activeFrom || !activeTo || !image) {
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

const getBannerDisplay = async (req, res) => {
  try {
    const limit = req.query.limit;
    if (!limit) {
      return res.status(400).json({
        status: "ERROR",
        message: "limit are required!",
      });
    }
    if (limit < 1) {
      return res.status(400).json({
        status: "ERROR",
        message: "limit are must be more than 0!",
      });
    }
    const response = await BannerService.getBannerDisplay(limit);
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
const getBanner = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const response = await BannerService.getBanner(
      Number(page) || 1,
      Number(limit) || 10
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
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
  getBannerDisplay,
  getBanner,
};
