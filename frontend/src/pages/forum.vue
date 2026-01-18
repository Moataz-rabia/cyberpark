<template>
    <div class="forum-layout">
        <Sidebar />
        <div class="forum-page">
            <div class="forum-content">
                <div v-for="post in posts" :key="post.id" class="forum-post">
                    <h1>{{ post.title }}</h1>
                    <p class="author" v-if="post.author">By {{ post.author.email }}</p>
                    <p v-else class="author">By Unknown</p>
                    <p>{{ post.content }}</p>

                    <div class="post-actions">
                        <button @click="likePost(post.id)">👍 Like ({{ post.likes || 0 }})</button>
                    </div>

                    <div class="comments-section">
                        <h2>Comments ({{ post.comments.length }})</h2>
                        <ul>
                            <li
                                v-for="(comment, index) in post.comments"
                                :key="index"
                                class="comment-item"
                            >
                                <p>{{ comment.content }}</p>
                                <span class="timestamp">{{ comment.createdAt }}</span>
                            </li>
                        </ul>

                        <form @submit.prevent="addComment(post.id)" class="comment-form">
                            <input
                                v-model="newComments[post.id]"
                                type="text"
                                placeholder="Add a comment"
                                required
                            />
                            <button type="submit">Post Comment</button>
                        </form>
                    </div>
                </div>

                <form @submit.prevent="createPost" class="post-form">
                    <input v-model="newPost.title" type="text" placeholder="Post Title" required />
                    <textarea v-model="newPost.content" placeholder="Post Content" required></textarea>
                    <button type="submit">Create Post</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPosts, createPost, addComment } from '../api/forum';
import Sidebar from '../components/sidebar.vue';

const posts = ref([]);
const newPost = ref({ title: '', content: '' });
const newComments = ref({});

const fetchPosts = async () => {
    try {
        const response = await getPosts();
        posts.value = response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
};

const createNewPost = async () => {
    try {
        const response = await createPost(newPost.value);
        posts.value.push(response.data);
        newPost.value = { title: '', content: '' };
    } catch (error) {
        console.error('Failed to create post:', error);
    }
};

const addNewComment = async (postId) => {
    try {
        const response = await addComment(postId, {
            content: newComments.value[postId],
            authorId: 1, // Replace with actual user ID
        });
        const post = posts.value.find((p) => p.id === postId);
        post.comments.push(response.data);
        newComments.value[postId] = '';
    } catch (error) {
        console.error('Failed to add comment:', error);
    }
};

onMounted(fetchPosts);
</script>

<style scoped>
.forum-layout {
    display: flex;
    min-height: 100vh;
}

.forum-page {
    flex: 1;
    margin-left: 220px;
    padding: 40px;
    background: linear-gradient(135deg, #f8efe7 0%, #ffffff 100%);
    min-height: 100vh;
}

.forum-content {
    max-width: 800px;
    margin: 0 auto;
}

.forum-post {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

h1 {
    color: #2b5f7f;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
}

.author {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 10px;
}

.post-actions {
    margin: 10px 0;
}

.comments-section {
    margin-top: 30px;
}

.comments-section h2 {
    color: #2b5f7f;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

ul {
    list-style-type: none;
    padding: 0;
}

.comment-item {
    background: white;
    padding: 1rem;
    margin-bottom: 0.75rem;
    border-radius: 8px;
    border: 1px solid #e8dcc8;
    box-shadow: 0 2px 8px rgba(74, 159, 191, 0.08);
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.comment-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 159, 191, 0.15);
}

.timestamp {
    display: block;
    font-size: 0.8em;
    color: #999;
    margin-top: 5px;
}

.comment-form {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

.post-form {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

textarea {
    resize: none;
    height: 100px;
}
</style>