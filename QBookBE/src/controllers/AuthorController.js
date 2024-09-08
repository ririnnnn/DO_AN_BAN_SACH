const AuthorService = require("../services/AuthorService");

const createAuthor = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(404).json({
        status: "ERROR",
        message: "The input is required!",
      });
    }

    const response = await AuthorService.createAuthor(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const getAllAuthor = async (req, res) => {
  try {
    const response = await AuthorService.getAllAuthor();
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      res.status(400).json({
        status: "ERROR",
        message: "The author id is required!",
      });
    }

    const response = await AuthorService.getAuthorById(authorId);
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      res.status(404).json({
        status: "ERROR",
        message: "The author id is required!",
      });
    }

    const response = await AuthorService.updateAuthor(authorId, req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      res.status(404).json({
        status: "ERROR",
        message: "The author id is required!",
      });
    }

    const response = await AuthorService.deleteAuthor(authorId);
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const deleteManyAuthor = async (req, res) => {
  try {
    const authorIds = req.body;
    const response = await AuthorService.deleteManyAuthor(authorIds);
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const getAuthor = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const response = await AuthorService.getAuthor(
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

module.exports = {
  getAuthor,
  createAuthor,
  getAllAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  deleteManyAuthor,
};
