import axios from "axios";
const API_URL = "http://localhost:5000/api/posts/";

// Add Post
export const addPost = async (postData) => {
  const response = await axios.post(
    `${API_URL}addPost/${postData.user_id}`,
    postData
  );
  return response.data;
};

// Get All Posts
export const getAllPosts = async () => {
  const response = await axios.get(`${API_URL}getPost`);
  return response.data;
};

// ✅ NEW: React to Post
export const reactToPost = async (reactionData) => {
  const { postId, reaction } = reactionData;
  const response = await axios.post(`${API_URL}reactPost/${postId}`, {
    reaction,
  });
  return response.data;
};
