const express = require("express");
const router = express.Router();
const { isAuthorized } = require("@/middleware/authMiddleware");
const ContactController = require("@controllers/ContactController");

router
  .route("")
  .get(isAuthorized, ContactController.getContact)
  .post(isAuthorized, ContactController.createContact);

router
  .route("/:id")
  .get(isAuthorized, ContactController.getContactById)
  .put(isAuthorized, ContactController.updateContact)
  .delete(isAuthorized, ContactController.deleteContact);

router.get("/get-contact/:id", isAuthorized, ContactController.getContactUser);

router.post(
  "/delete-many-contact",
  isAuthorized,
  ContactController.deleteManyContact
);

module.exports = router;
