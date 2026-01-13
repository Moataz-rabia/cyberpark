//same just future forum routes
import api from "./axios";

// GET all posts
export const getPosts = () =>
  api.get("/forum");

// GET one post
export const getPostById = (id) =>
  api.get(`/forum/${id}`);

// CREATE a post
export const createPost = (data) =>
  api.post("/forum", data);

// ADD comment
export const addComment = (postId, data) =>
  api.post(`/forum/${postId}/comments`, data);
