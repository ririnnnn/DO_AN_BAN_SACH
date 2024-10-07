const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/delete-many", authMiddleware, OrderController.deleteManyOrder);
router.get("/get-order/:id", authUserMiddleware, OrderController.getOrderById);
router.get("/get-order-detail/:id", OrderController.getOrderDetail);
router.get("/get-all-order", authMiddleware, OrderController.getAllOrder);
router.get("/get-count-order", authMiddleware, OrderController.getCountOrder);
router.get("/get-total-price", authMiddleware, OrderController.getTotalPrice);

router
  .route("")
  .get(authMiddleware, OrderController.getOrder)
  .post(authUserMiddleware, OrderController.createOrder);

router
  .route("/:id")
  .put(authMiddleware, OrderController.updateOrder)
  .delete(authUserMiddleware, OrderController.deleteOrder);

module.exports = router;
