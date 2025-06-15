const express = require("express");
const { authCheck, onlyAdmin } = require("../middleware/auth");
const { signUp, login, getAllUser } = require("../controller/userController");

const userRouter = express.Router();

// ✅ Public Routes
userRouter.post("/signup", signUp);     // Anyone can register
userRouter.post("/login", login);       // Anyone can login
// +++++++++++++++++++++++++++++  ejs
userRouter.get("/signup", (req, res) => {
    res.render("signup");
});

userRouter.get("/login", (req, res) => {
    res.render("login");
});
// _++++++++++++++++++++++++++++++ejs end 


// ✅ Protected Route (Any Logged-in User)
userRouter.get("/profile", authCheck, (req, res) => {
    res.send(`Welcome ${req.user.role}, your ID is ${req.user.userId}`);
});

// ✅ Admin-Only Route
userRouter.get("/all-users", authCheck, onlyAdmin, getAllUser);

module.exports = userRouter;
