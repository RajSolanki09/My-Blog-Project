const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authController = require('../controllers/authController');

// Multer config for file uploads (profile pics)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Routes
router.get('/register', (req, res) => {
  res.render('register', { message: req.query.message || null });
});

router.post('/register', upload.single('profilePic'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('Profile picture is required');
  }
  next();
}, authController.register);

router.get('/login', (req, res) => {
  res.render('login', { message: req.query.message || null });
});

router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;