import express from "express";
import { addPost } from "../controllers/postController.js";
export const postRouter = express.Router();

postRouter.post("/addPost/:user_id", addPost);
