import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPost, getAllPosts, reactToPost } from "./postService";

const initialState = {
  posts: [],
  postLoading: false,
  postError: false,
  postSuccess: false,
  postMessage: "",
};

// Send post data to backend
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, thunkAPI) => {
    try {
      const res = await addPost(postData);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get all posts from backend
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const res = await getAllPosts();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ✅ NEW: React to a post
export const addReaction = createAsyncThunk(
  "posts/addReaction",
  async (reactionData, thunkAPI) => {
    try {
      const res = await reactToPost(reactionData);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postReset: (state) => {
      state.postLoading = false;
      state.postError = false;
      state.postSuccess = false;
      state.postMessage = "";
    },
  },
  extraReducers: (builder) => {
    // Create Post
    builder.addCase(createPost.pending, (state) => {
      state.postLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.postLoading = false;
      state.postSuccess = true;
      state.posts.unshift(action.payload.newPost);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.postLoading = false;
      state.postError = true;
      state.postMessage = action.payload;
    });

    // Get Posts
    builder.addCase(getPosts.pending, (state) => {
      state.postLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.postLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.postLoading = false;
      state.postError = true;
      state.postMessage = action.payload;
    });

    // ✅ NEW: Add Reaction
    // builder.addCase(addReaction.pending, (state) => {
    //   // Optional: You can add a loading state for reactions if needed
    // });
    builder.addCase(addReaction.fulfilled, (state, action) => {
      // Find the post and update it with the new reaction data
      const updatedPost = action.payload.post;
      const index = state.posts.findIndex((p) => p._id === updatedPost._id);

      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    });
    builder.addCase(addReaction.rejected, (state, action) => {
      state.postError = true;
      state.postMessage = action.payload;
    });
  },
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;
