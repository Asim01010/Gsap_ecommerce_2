import { Posts } from "../models/postModel.js";

export const addPost = async (req, res) => {
  try {
    const { text, background } = req.body;
    const { user_id } = req.params;

    // Validate text
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "text is required",
      });
    }

    // Create Post
    const newPost = await Posts.create({
      text,
      background: {
        startColor: background?.startColor || "#ffffff",
        endColor: background?.endColor || "#ffffff",
        backgroundImage: background?.backgroundImage || "",
      },
      user: user_id,
    });

    // Return FULL post object
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      newPost,
    });
  } catch (error) {
    console.error("Add Post Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPosts = async (req, res) => {
  const allPosts = await Posts.find();
  res.status(200).json(allPosts);
};
