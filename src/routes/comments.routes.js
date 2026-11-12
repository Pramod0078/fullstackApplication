import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createComment,
  deleteComment,
  getParentComments,
  likeOnComment,
} from "../controllers/comment.controller.js";

const router = Router();
router.route("/comment/:videoId").post(verifyJWT, createComment);
router.route("/parent-comment/:videoId").get(verifyJWT, getParentComments);
router.route("/delete-comment/:commentId").post(verifyJWT, deleteComment);
router.route("/comment-like").post(verifyJWT, likeOnComment);
export default router;
   