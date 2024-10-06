const express = require("express");
const router = express.Router();
const StatisticController = require("../controllers/StatisticController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.route("").get(isAuthorized, StatisticController.getStatistic);

//router.route("/delete-many").post(NewController.deleteManyNew);

module.exports = router;
