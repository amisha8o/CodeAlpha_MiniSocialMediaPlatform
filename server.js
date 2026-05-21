const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves the frontend

// Mock Database for the social media feed
let posts = [
    { id: 1, author: 'CodeAlpha Intern', content: 'So excited to complete my web dev internship!', likes: 5 }
];

// Endpoint to get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Endpoint to create a new post
app.post('/api/posts', (req, res) => {
    const { author, content } = req.body;
    if (!author || !content) return res.status(400).json({ error: 'Missing content' });
    
    const newPost = { id: Date.now(), author, content, likes: 0 };
    posts.unshift(newPost); // Adds the new post to the very top of the feed
    res.json(newPost);
});

// Endpoint to like a post
app.post('/api/posts/:id/like', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        post.likes += 1;
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Social Media Server running on http://localhost:${PORT}`));