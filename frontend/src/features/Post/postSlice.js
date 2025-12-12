import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPost, getAllPosts } from "./postService";

const initialState = {
  posts: [],
  postLoading: false,
  postError: false,
  postSuccess: false,
  postMessage: "",
};
// send post data to backend
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, thunkAPI) => {
    try {
      const res = await addPost(postData);
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
// get all posts from backend
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const res = await getAllPosts();
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postReset: (state) => {
      state.posts = [];
      state.postLoading = false;
      state.postError = false;
      state.postSuccess = false;
      state.postMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.postLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      console.log("FULFILLED PAYLOAD:", action.payload.newPost);
      state.postLoading = false;
      state.postSuccess = true;
      state.posts.push(action.payload);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.postLoading = false;
      state.postError = true;
      state.postMessage = action.payload;
    });
    builder.addCase(getPosts.pending, (state) => {
      state.postLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.postLoading = false;
      state.postSuccess = true;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.postLoading = false;
      state.postError = true;
      state.postMessage = action.payload;
    });
  },
});
export const { postReset } = postSlice.actions;
export default postSlice.reducer;
