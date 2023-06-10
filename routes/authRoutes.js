// Import the Express module and create a new router object
const express = require("express");
const router = express.Router();

// Import the authentication controller module
const authController = require("../controllers/authController");

// Define routes for user login

router.post("/login", authController.login);

// Export the router from the module
module.exports = router;
