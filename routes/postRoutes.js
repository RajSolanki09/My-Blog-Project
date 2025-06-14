const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const requireAuth = require('../middleware/authMiddleware');

// All post routes require authentication
router.use(requireAuth);

router.get('/dashboard', postController.dashboard);
router.post('/create', postController.createPost);

// View single post
router.get('/:id', postController.viewPost);

// Edit form
router.get('/:id/edit', postController.editPostForm);

// Update post
router.post('/:id/update', postController.updatePost);

// Delete post
router.post('/:id/delete', postController.deletePost);

module.exports = router;