const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.get("/get-all", ProductController.getAllProduct);
router.get("/get-product-best-seller", ProductController.getBestSeller);
router.get(
  "/get-count-product",
  authMiddleware,
  ProductController.getCountProduct
);
router.post(
  "/delete-many",
  authMiddleware,
  ProductController.deleteManyProduct
);
router.get("/get-all-type", ProductController.getAllType);
router.get("/get-product-author", ProductController.getProductAuthor);
router.get("/search", ProductController.searchProduct);

router
  .route("")
  .get(ProductController.getProduct)
  .post(ProductController.createProduct);

router
  .route("/:id")
  .get(ProductController.getDetailProduct)
  .put(authMiddleware, ProductController.updateProduct)
  .delete(authMiddleware, ProductController.deleteProduct);

router.route("/:id/rate").post(ProductController.ratingProduct);

module.exports = router;
