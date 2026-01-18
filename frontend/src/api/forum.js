//same just future forum routes
import api from "./axios";

// GET all posts
export const getPosts = () =>
  api.get("/forum/posts");

// GET one post
export const getPostById = (id) =>
  api.get(`/forum/posts/${id}`);

// CREATE a post
export const createPost = (data) =>
  api.post("/forum/posts", data);

// ADD comment
export const addComment = (postId, data) =>
  api.post(`/forum/posts/${postId}/comments`, data);
