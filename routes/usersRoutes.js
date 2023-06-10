// Import the Express module and create a new router object
const express = require("express");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

// Import the authentication controller module
const userController = require("../controllers/userController");

// Define routes for user login

/* READ */
// router.get("/:id", verifyToken, userController.getUser);
// router.get("/:id/friends", verifyToken, userController.getUserFriends);

/* UPDATE */
// router.patch("/:id/:friendId", verifyToken, userController.addRemoveFriend);

// Export the router from the module
module.exports = router;
