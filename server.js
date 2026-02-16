const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for different pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Blog page
app.get('/blog', (req, res) => {
  console.log('Handling GET /blog');
  res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});

// API route to serve posts.json
app.get('/api/posts', (req, res) => {
  console.log('Handling GET /api/posts');
  const postsPath = path.join(__dirname, 'data', 'posts.json');
  fs.readFile(postsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading posts.json:', err);
      return res.status(500).json({ error: 'Failed to load posts' });
    }
    try {
      const posts = JSON.parse(data);
      res.json(posts);
    } catch (parseErr) {
      console.error('Invalid posts.json:', parseErr);
      res.status(500).json({ error: 'Invalid posts format' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});