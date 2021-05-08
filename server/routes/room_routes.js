const router = require("express").Router();
const roomController= require("../controllers/room-controllers.js")

router.post("/", roomController.create_room);
router.get("/:id", roomController.get_roomById);
router.get("/", roomController.getAllRoom);
router.put("/:id", roomController.update_users);
module.exports = router;