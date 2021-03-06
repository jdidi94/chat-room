
const router = require("express").Router();
const userController= require("../controllers/auth-controllers")

router.get("/hello", userController.hello);
router.get("/", userController.getUser);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.patch("/:id", userController.useredit);
module.exports = router;