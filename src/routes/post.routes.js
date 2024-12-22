import express from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/post.controllers.js";

const router = express.Router();

router.post("/posts", createPost);
router.get("/posts", getPosts);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router