const express = require("express");
const router = express.Router();
const {
  createNewUser,
  modifyUserAttributes,
  getUserAttribute,
} = require("../controllers/userController");

router.post("/:id", createNewUser);
router.patch("/:id", modifyUserAttributes);
router.get("/:id/:attribute", getUserAttribute);

module.exports = router;
