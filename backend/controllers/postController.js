import { Posts } from "../models/postModel.js";

export const addPost = async (req, res) => {
  try {
    const { caption, background } = req.body;
    const { user_id } = req.params;

    // Validate caption
    if (!caption) {
      return res.status(400).json({
        success: false,
        message: "Caption is required",
      });
    }

    // Create Post
    const newPost = await Posts.create({
      caption,
      background: {
        startColor: background?.startColor || "#ffffff",
        endColor: background?.endColor || "#ffffff",
        backgroundImage: background?.backgroundImage || "",
      },
      user: user_id,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Add Post Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
