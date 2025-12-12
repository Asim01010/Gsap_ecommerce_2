import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    background: {
      // Gradient Colors (optional)
      startColor: {
        type: String,
        default: "#ffffff",
      },
      endColor: {
        type: String,
        default: "#ffffff",
      },

      // Background Image (optional)
      backgroundImage: {
        type: String,
        default: "",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Posts = mongoose.model("Post", postSchema);
