const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      price,
      countInStock,
      discount,
      description,
      pageCount,
      format,
      weight,
    } = req.body;
    if (
      !name ||
      !image ||
      !price ||
      !countInStock ||
      !discount ||
      !description ||
      !pageCount ||
      !format ||
      !weight
    ) {
      res.status(400).json({
        status: "ERROR",
        message: "The input is required!",
      });
    }

    const response = await ProductService.createProduct(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      res.status(400).json({
        status: "ERROR",
        message: "The productId is required!",
      });
    }

    const response = await ProductService.updateProduct(productId, req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      res.status(404).json({
        status: "ERROR",
        message: "The product id is required!",
      });
    }

    const response = await ProductService.getDetailProduct(productId);
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      res.status(200).json({
        status: "ERROR",
        message: "The productId is required!",
      });
    }

    const response = await ProductService.deleteProduct(productId);
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter, publisher, rating } = req.query;
    const response = await ProductService.getAllProduct(
      Number(limit),
      Number(page) || 1,
      sort,
      filter,
      publisher,
      Number(rating)
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyProduct = async (req, res) => {
  try {
    const ids = req.body;
    const response = await ProductService.deleteManyProduct(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await ProductService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getCountProduct = async (req, res) => {
  try {
    const response = await ProductService.getCountProduct();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getProductAuthor = async (req, res) => {
  try {
    const { limit, page, sort, filter, publisher, rating } = req.query;

    const response = await ProductService.getProductAuthor(
      Number(limit),
      Number(page) || 0,
      sort,
      filter,
      publisher,
      Number(rating)
    );

    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { q } = req.query;
    const response = await ProductService.searchProduct(q);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const ratingProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { userId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      res.status(400).json({
        message: "Rating must be between 1 and 5!",
      });
    }

    const response = await ProductService.ratingProduct(
      productId,
      userId,
      rating
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const response = await ProductService.getProduct(
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

const getBestSeller = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const response = await ProductService.getBestSeller(
      Number(page || 1),
      Number(limit || 12)
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailProduct,
  getAllProduct,
  deleteManyProduct,
  getAllType,
  getCountProduct,
  getProductAuthor,
  searchProduct,
  ratingProduct,
  getProduct,
  getBestSeller,
};
