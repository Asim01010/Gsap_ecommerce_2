import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
    },

    background: {
      startColor: { type: String, default: "#ffffff" },
      endColor: { type: String, default: "#ffffff" },
      backgroundImage: { type: String, default: "" },
    },

    image: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },

    // 🔥 REACTION COUNTS
    reactions: {
      like: { type: Number, default: 0 },
      love: { type: Number, default: 0 },
      haha: { type: Number, default: 0 },
      wow: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
      angry: { type: Number, default: 0 },
    },

    // 🔥 USER REACTIONS
    userReactions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Register",
          required: true,
        },
        reaction: {
          type: String,
          enum: ["like", "love", "haha", "wow", "sad", "angry"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Validation: post must have text or image
postSchema.pre("validate", function (next) {
  if (!this.text && !this.image) {
    this.invalidate("text", "Post must have text or an image");
  }
  next();
});

export const Posts = mongoose.model("Post", postSchema);
