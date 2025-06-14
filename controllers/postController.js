const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

exports.dashboard = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const posts = await Post.find({ user: decoded.id })
      .populate('user', 'username profilePic')
      .sort({ createdAt: -1 });
      
    res.render('dashboard', { 
      posts, 
      username: decoded.username 
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    res.clearCookie('token');
    res.redirect('/login');
  }
};

exports.createPost = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send('Title and content are required');
    }

    if (title.trim().length === 0 || content.trim().length === 0) {
      return res.status(400).send('Title and content cannot be empty');
    }

    const post = new Post({
      title: title.trim(),
      content: content.trim(),
      user: decoded.id
    });

    await post.save();
    console.log('Post created successfully by:', decoded.username);
    res.redirect('/posts/dashboard');
    
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).send('Error creating post');
  }
};

exports.viewPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username profilePic');
      
    if (!post) {
      return res.status(404).send('Post not found');
    }
    
    res.render('viewPost', { post });
    
  } catch (error) {
    console.error('View post error:', error);
    res.status(500).send('Error loading post');
  }
};

exports.editPostForm = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).send('Post not found');
    }
    
    // Check if user owns this post
    if (post.user.toString() !== decoded.id) {
      return res.status(403).send('You can only edit your own posts');
    }
    
    res.render('editPost', { post });
    
  } catch (error) {
    console.error('Edit form error:', error);
    res.status(500).send('Error loading edit form');
  }
};

exports.updatePost = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).send('Title and content are required');
    }

    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).send('Post not found');
    }
    
    // Check if user owns this post
    if (post.user.toString() !== decoded.id) {
      return res.status(403).send('You can only edit your own posts');
    }
    
    post.title = title.trim();
    post.content = content.trim();
    await post.save();
    
    console.log('Post updated successfully by:', decoded.username);
    res.redirect('/posts/dashboard');
    
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).send('Error updating post');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).send('Post not found');
    }
    
    // Check if user owns this post
    if (post.user.toString() !== decoded.id) {
      return res.status(403).send('You can only delete your own posts');
    }
    
    await Post.findByIdAndDelete(req.params.id);
    console.log('Post deleted successfully by:', decoded.username);
    res.redirect('/posts/dashboard');
    
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).send('Error deleting post');
  }
};