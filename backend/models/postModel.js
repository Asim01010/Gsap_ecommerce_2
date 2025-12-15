import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
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

    image: {
      type: String,
      default: "",
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

// Custom validator to ensure at least text or image exists
postSchema.pre("validate", function (next) {
  if (!this.text && !this.image) {
    this.invalidate("text", "Post must have text or an image");
  }
  next();
});

export const Posts = mongoose.model("Post", postSchema);
