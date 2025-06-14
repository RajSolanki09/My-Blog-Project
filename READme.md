Directory Structure
blog-app/
├── package.json
├── app.js
├── .env
├── models/
│   ├── User.js
│   └── Post.js
├── controllers/
│   ├── authController.js
│   └── postController.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── postRoutes.js
├── views/
│   ├── register.ejs
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── viewPost.ejs
│   └── editPost.ejs
├── uploads/ (create this directory)
└── public/ (create this directory)
Installation & Setup Instructions

Create the project directory and navigate to it:

bashmkdir blog-app
cd blog-app

Initialize npm and install dependencies:

bashnpm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken multer ejs cookie-parser
npm install --save-dev nodemon

Create the directory structure:

bashmkdir models controllers middleware routes views uploads public

Create all the files with the code provided above
Make sure MongoDB is running:

bash# On macOS with Homebrew:
brew services start mongodb-community

# On Ubuntu/Linux:
sudo systemctl start mongod

# On Windows, start MongoDB service from Services

Run the application:

bash# Development mode
npm run dev

# Production mode
npm start

Access the application:
Open your browser and go to http://localhost:3000

Features Included

✅ User registration with profile picture upload
✅ User login/logout with JWT authentication
✅ Protected routes
✅ Create, read, update, delete blog posts
✅ User can only edit/delete their own posts
✅ Responsive design
✅ Error handling
✅ Input validation
✅ File upload for profile pictures
✅ Session management with cookies
✅ Password hashing with bcrypt

Important Notes

Make sure to create the uploads and public directories
MongoDB must be running before starting the application
Change the JWT_SECRET in .env to a secure random string
Profile pictures are stored in the uploads directory
The application uses EJS as the template engine