const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).send('Profile picture is required');
    }
    
    const profilePic = req.file.filename;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).send('User with this email or username already exists');
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).send('Password must be at least 6 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      profilePic
    });

    await user.save();
    console.log('User registered successfully:', username);
    res.redirect('/login?message=Registration successful! Please login.');
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      return res.status(400).send('User with this email or username already exists');
    }
    
    res.status(500).send('Server error during registration');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign(
      { id: user._id, username: user.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.cookie('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    console.log('User logged in successfully:', user.username);
    res.redirect('/posts/dashboard');
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error during login');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login?message=Logged out successfully');
};