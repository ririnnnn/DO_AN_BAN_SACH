const NewService = require("../services/NewService");

const createNew = async (req, res) => {
  try {
    const response = await NewService.createNew(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getNew = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const response = await NewService.getNew(
      Number(page) || 1,
      Number(limit) || 10
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
};

const updateNew = async (req, res) => {
  try {
    const newId = req.params.id;

    if (!newId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The new id is required!",
      });
    }

    const response = await NewService.updateNew(newId, req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteNew = async (req, res) => {
  try {
    const newId = req.params.id;

    if (!newId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The new id is required!",
      });
    }

    const response = await NewService.deleteNew(newId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyNew = async (req, res) => {
  try {
    const response = await NewService.deleteManyNew(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailNew = async (req, res) => {
  try {
    const newId = req.params.id;

    if (!newId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The new id is required!",
      });
    }

    const response = await NewService.getDetailNew(newId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createNew,
  updateNew,
  deleteNew,
  deleteManyNew,
  getNew,
  getDetailNew,
};
