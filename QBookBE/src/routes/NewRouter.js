const express = require("express");
const router = express.Router();
const NewController = require("../controllers/NewController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.route("").get(NewController.getNew);
router.route("").post(NewController.createNew);

router
  .route("/:id")
  .get(NewController.getDetailNew)
  .put(NewController.updateNew)
  .delete(NewController.deleteNew);

router.route("/delete-many").post(NewController.deleteManyNew);

module.exports = router;
