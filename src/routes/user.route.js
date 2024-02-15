const express = require("express");
const verifyToken = require("../utils/verifyUser");
const { UpdateUser, DeleteUser, getUserListings, getUser } = require("../controllers/user.controller");
const router = express.Router();

router.post("/update", verifyToken, UpdateUser);
router.delete("/delete", verifyToken, DeleteUser);
router.get('/listings', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

module.exports = router;
