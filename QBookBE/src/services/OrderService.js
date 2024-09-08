const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const EmailService = require("./EmailService");

const createOrder = (reqBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        orderItems,
        fullName,
        address,
        city,
        phone,
        paymentMethod,
        deliveryMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        userId,
        isPaid,
        paidAt,
        email,
      } = reqBody;

      const result = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order?.product,
            countInStock: { $gte: order?.amount },
          },
          { $inc: { countInStock: -order?.amount, selled: +order?.amount } },
          { new: true }
        );

        if (productData) {
          return {
            status: "OK",
            message: "Update the product ordered successfully!",
          };
        } else {
          return {
            status: "OK",
            message: "ERROR",
            id: order?.product,
          };
        }
      });

      const results = await Promise.all(result);
      const newData = results.filter((item) => item.id);
      if (newData.length > 0) {
        const arrId = [];
        newData.forEach((item) => {
          arrId.push(item.id);
        });
        resolve({
          status: "ERROR",
          message: `Sản phẩm có id ${arrId.join(",")} đã hết hàng!`,
        });
      } else {
        const newOrder = await Order.create({
          orderItems,
          shippingAddress: {
            fullName,
            address,
            city,
            phone,
            email,
          },
          paymentMethod,
          deliveryMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          user: userId,
          isPaid,
          paidAt,
        });

        if (newOrder) {
          await EmailService.sendEmailCreateOrder(email, newOrder);
          resolve({
            status: "OK",
            message: "Order the product successfully!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getOrderById = (userId, statusDelivery, pageString) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      let totalOrder = null;
      const PAGE_SIZE = 5;
      let page = Number(pageString);

      if (page <= 0) page = 1;

      if (page) {
        if (statusDelivery === "all") {
          result = await Order.find({
            user: userId,
          })
            .sort({ createdAt: -1 })
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE);
          totalOrder = await Order.count({
            user: userId,
          });
        }

        if (statusDelivery === "wait") {
          result = await Order.find({
            user: userId,
            isDelivered: "Chờ giao hàng",
          })
            .sort({ createdAt: -1 })
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE);
          totalOrder = await Order.count({
            user: userId,
            isDelivered: "Chờ giao hàng",
          });
        }

        if (statusDelivery === "delivering") {
          result = await Order.find({
            user: userId,
            isDelivered: "Đang giao hàng",
          })
            .sort({ createdAt: -1 })
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE);
          totalOrder = await Order.count({
            user: userId,
            isDelivered: "Đang giao hàng",
          });
        }

        if (statusDelivery === "delivered") {
          result = await Order.find({
            user: userId,
            isDelivered: "Đã giao hàng",
          })
            .sort({ createdAt: -1 })
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE);
          totalOrder = await Order.count({
            user: userId,
            isDelivered: "Đã giao hàng",
          });
        }
      }

      if (result === null) {
        resolve({
          status: "ERROR",
          message: "The user id is not definded!",
        });
      } else {
        resolve({
          status: "OK",
          message: "Get orders success!",
          totalOrder,
          data: result,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getOrderDetail = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findById({
        _id: orderId,
      });
      if (checkOrder === null) {
        resolve({
          status: "ERROR",
          message: "The order id is not definded!",
        });
      } else {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: checkOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteOrder = (orderId, reqBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { orderItems, email } = reqBody;

      const result = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order?.product,
            selled: { $gte: order?.amount },
          },
          { $inc: { countInStock: +order?.amount, selled: -order?.amount } },
          { new: true }
        );

        if (productData) {
          const orderDelete = await Order.findByIdAndDelete(orderId);

          if (orderDelete === null) {
            resolve({
              status: "ERROR",
              message: "The order id is not definded!",
            });
          } else {
            await EmailService.sendEmailDeleteOrder(email, orderDelete);
            resolve({
              status: "OK",
              message: "Delete the order successfully!",
              data: orderDelete,
            });
          }
        } else {
          return {
            status: "ERROR",
            message: "The productData is not definded!",
            id: order?.product,
          };
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find();
      resolve({
        status: "OK",
        message: "Get all order successfully!",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({ _id: id });

      if (checkOrder === null) {
        resolve({
          status: "ERROR",
          message: "The order is not defined!",
        });
      }

      const dataUpdateOrder = await Order.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Update the order successfully!",
        data: dataUpdateOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyOrder = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Order.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete many order successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getCountOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Order.countDocuments();
      resolve({
        status: "OK",
        message: "Get count order successfully!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getTotalPrice = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find();
      const totalPrice = allOrder?.reduce((total, item) => {
        return (total =
          total +
          (item.isPaid === true && item.isDelivered === "Đã giao hàng"
            ? item.totalPrice
            : 0));
      }, 0);
      resolve({
        status: "SUCCESS",
        message: "Get total price successfully!",
        data: totalPrice,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getOrder = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Order.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalOrder = await Order.count();

      resolve({
        status: "OK",
        message: "Get orders successfully!",
        data: result,
        totalOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const payOrder = (orderId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      reject("unimplemented");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getOrderById,
  getOrderDetail,
  deleteOrder,
  updateOrder,
  getAllOrder,
  deleteManyOrder,
  getCountOrder,
  getTotalPrice,
  getOrder,
  payOrder,
};
