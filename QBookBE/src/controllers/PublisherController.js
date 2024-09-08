const PublisherService = require("../services/PublisherService");

const createPublisher = async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(404).json({
        status: "ERROR",
        message: "The name and address is required!",
      });
    }
    const respone = await PublisherService.createPublisher(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllPublisher = async (req, res) => {
  try {
    const respone = await PublisherService.getAllPublisher();
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getPublisherById = async (req, res) => {
  try {
    const publisherId = req.params.id;

    if (!publisherId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The publisher id is required!",
      });
    }

    const respone = await PublisherService.getPublisherById(publisherId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getPublisher = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const response = await PublisherService.getPublisher(
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

const updatePublisher = async (req, res) => {
  try {
    const publisherId = req.params.id;
    const data = req.body;

    if (!publisherId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The publisher id is required!",
      });
    }

    const respone = await PublisherService.updatePublisher(publisherId, data);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deletePublisher = async (req, res) => {
  try {
    const publisherId = req.params.id;

    if (!publisherId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The publisher id is required!",
      });
    }

    const respone = await PublisherService.deletePublisher(publisherId);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyPublisher = async (req, res) => {
  try {
    const publisherIds = req.body;
    const respone = await PublisherService.deleteManyPublisher(publisherIds);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createPublisher,
  getAllPublisher,
  updatePublisher,
  deletePublisher,
  deleteManyPublisher,
  getPublisher,
  getPublisherById,
};
