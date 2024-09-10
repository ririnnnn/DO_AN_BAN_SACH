const express = require("express");
const router = express.Router();
const BannerController = require("../controllers/BannerController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.route("/display").get(BannerController.getBannerDisplay);
router
  .route("")
  .get(BannerController.getBanner)
  .post(isAuthorized, BannerController.createBanner);
router
  .route("/:id")
  .get(BannerController.getBannerById)
  .put(isAuthorized, BannerController.updateBanner)
  .delete(isAuthorized, BannerController.deleteBanner);

router.route("/delete-many").post(BannerController.deleteBanner);

module.exports = router;
