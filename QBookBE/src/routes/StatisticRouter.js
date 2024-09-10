const express = require("express");
const router = express.Router();
const StatisticController = require("../controllers/StatisticController");
const { isAuthorized } = require("../middleware/authMiddleware");

router
  .route("")
  .get(isAuthorized, StatisticController.getStatisticById)
  .post(StatisticController.createStatistic);

router
  .route("/:id")
  .get(StatisticController.getStatisticById)
  .put(StatisticController.updateStatistic)
  .delete(StatisticController.deleteStatistic);

//router.route("/delete-many").post(NewController.deleteManyNew);

module.exports = router;
