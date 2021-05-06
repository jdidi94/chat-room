const router = require("express").Router();
const messageController= require("../controllers/message-controllers")

router.post("/", messageController.create_message);
router.get("/:id", messageController.getAllMessageforOneroom);

module.exports = router;