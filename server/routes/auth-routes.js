
const router = require("express").Router();
const userController= require("../controllers/auth-controllers")

 router.get("/hello", userController.hello);

router.post("/signup", userController.signUp);
router.post("/login", userController.login);

module.exports = router;