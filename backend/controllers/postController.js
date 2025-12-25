import { Posts } from "../models/postModel.js";

export const addPost = async (req, res) => {
  try {
    const { text, background,image } = req.body;
    const { user_id } = req.params;

    // Validate text
 if (!text && !image && !background?.backgroundImage) {
   return res.status(400).json({
     success: false,
     message: "Post content is required",
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
      image,
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
  const allPosts = await Posts.find()
    .populate("user", "firstName lastName verified")
    .sort({ createdAt: -1 });
  res.status(200).json(allPosts);
};

export const reactToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { reaction } = req.body;
    const userId = "6937b33dfab028efccd027bb";

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const existingReaction = post.userReactions.find(
      (r) => r.user.toString() === userId
    );

    if (existingReaction) {
      if (existingReaction.reaction === reaction) {
        post.reactions[reaction] -= 1;
        post.userReactions = post.userReactions.filter(
          (r) => r.user.toString() !== userId
        );
      } else {
        post.reactions[existingReaction.reaction] -= 1;
        post.reactions[reaction] += 1;
        existingReaction.reaction = reaction;
      }
    } else {
      post.reactions[reaction] += 1;
      post.userReactions.push({
        user: userId,
        reaction,
      });
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "Reaction updated",
      post,
    });
  } catch (error) {
    console.error("React Post Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
