const { SignUp, Signin, SigninWithGoogle, signOut } = require("../controllers/auth.controller");

const express = require("express");
const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", Signin);
router.post("/google", SigninWithGoogle);
router.get("/signout", signOut);

module.exports = router;
