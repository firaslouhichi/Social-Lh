import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  LikeUnlikePost,
  createPost,
  deletePost,
  getFeedPosts,
  getPost,
  getUserPosts,
  replyToPost,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.post("/create", protectRoute, createPost);
router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.delete("/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, LikeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);

export default router;
