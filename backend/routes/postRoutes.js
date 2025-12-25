import express from "express";
import { addPost, getPosts, reactToPost } from "../controllers/postController.js";
export const postRouter = express.Router();

postRouter.post("/addPost/:user_id", addPost);
postRouter.get("/getPost", getPosts);
postRouter.post("/reactPost/:postId", reactToPost);
