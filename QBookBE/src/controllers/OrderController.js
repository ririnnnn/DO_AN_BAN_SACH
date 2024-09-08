const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    const {
      fullName,
      address,
      city,
      phone,
      paymentMethod,
      itemsPrice,
      totalPrice,
      userId,
    } = req.body;

    if (
      !fullName ||
      !address ||
      !city ||
      !phone ||
      !paymentMethod ||
      !itemsPrice ||
      !totalPrice ||
      !userId
    ) {
      return res.status(404).json({
        status: "ERROR",
        message: "The input is required!",
      });
    }

    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { delivery: statusDelivery, page: pageString } = req.query;

    if (!userId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The user id is required!",
      });
    }

    const response = await OrderService.getOrderById(
      userId,
      statusDelivery,
      pageString
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The order id is required!",
      });
    }
    const response = await OrderService.getOrderDetail(orderId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      res.status(404).json({
        status: "ERROR",
        message: "The order id is required!",
      });
    }

    const response = await OrderService.deleteOrder(orderId, req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(404).json({
      message: e,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const respone = await OrderService.getAllOrder();
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyOrder = async (req, res) => {
  try {
    const ids = req.body;
    const respone = await OrderService.deleteManyOrder(ids);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The order id is required!",
      });
    }

    const response = await OrderService.updateOrder(orderId, req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getCountOrder = async (req, res) => {
  try {
    const respone = await OrderService.getCountOrder();
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getTotalPrice = async (req, res) => {
  try {
    const response = await OrderService.getTotalPrice();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const order = await OrderService.getOrder(
      Number(page) || 1,
      Number(limit) || 10
    );
    return res.status(200).json(order);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const PayOrder = async (req, res) => {
  try {
    const { orderId } = req.query;
    const { data } = req.body;
    if (orderId) {
      return res.status(400).json("invalid order id!");
    }
    if (data) {
      return res.status(400).json("invalid payment!");
    }
    const response = await OrderService.payOrder(orderId, data);
    if (response.ok) {
      return res.status(200).json(response);
    } else res.status(400).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrderById,
  getOrderDetail,
  deleteOrder,
  getAllOrder,
  deleteManyOrder,
  getCountOrder,
  getTotalPrice,
  getOrder,
};
