const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const PublisherController = require("../controllers/PublisherController");

router.get("/get-all-publisher", PublisherController.getAllPublisher);
router.get(
  "/get-publisher/:id",
  authMiddleware,
  PublisherController.getPublisherById
);
router.post(
  "/create-publisher",
  authMiddleware,
  PublisherController.createPublisher
);
router.put(
  "/update-publisher/:id",
  authMiddleware,
  PublisherController.updatePublisher
);
router.delete(
  "/delete-publisher/:id",
  authMiddleware,
  PublisherController.deletePublisher
);
router.post(
  "/delete-many-publisher",
  authMiddleware,
  PublisherController.deleteManyPublisher
);
router.route("").get(PublisherController.getPublisher);

module.exports = router;
