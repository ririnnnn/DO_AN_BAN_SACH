const express = require("express");
const router = express.Router();
const BannerController = require("../controllers/BannerController");
const { isAuthorized } = require("../middleware/authMiddleware");

router
  .route("")
  .get(isAuthorized, BannerController.getBannerById)
  .post(BannerController.createBanner);

router
  .route("/:id")
  .get(BannerController.getBannerById)
  .put(BannerController.updateBanner)
  .delete(BannerController.deleteBanner);

//router.route("/delete-many").post(NewController.deleteManyNew);

module.exports = router;
