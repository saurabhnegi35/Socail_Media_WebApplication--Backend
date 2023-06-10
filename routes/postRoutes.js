const express = require("express");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controllers/postController");

const { verifyToken } = require("../middleware/auth");

const router = express.Router();

/* READ */

/* UPDATE */
