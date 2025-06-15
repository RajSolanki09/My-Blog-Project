// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken')

// const signUp = async (req, res) => {
//     try {
//         const { userName, email, password, role } = req.body;

//         if (!email || !password || !userName) {
//             return res.status(400).json({ message: "Username, Email and password are required." });
//         }

//         const isExist = await User.findOne({ email });

//         if (isExist) {
//             return res.status(400).send({ message: "User already exists" });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({ userName, email, password: hashedPassword, role });
//         res.status(201).send({ message: 'User Created Successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Server error", error: error.message });
//     }
// };

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).send({ message: "Email and Password are required." });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).send({ message: "User does not exist so signup first" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).send({ message: "Invalid details" });
//         }

//         const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: '1h' })

//         res.status(200).json({
//             message: 'User Logged In Successfully',
//             token,
//             user: { id: user._id, userName: user.userName, email: user.email, role: user.role }
//         });
//     } catch (error) {
//         res.status(500).send({ message: "Server error", error: error.message });
//     }
// }

// const getAllUser = async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.status(200).send(users);

//     } catch (error) {
//         res.status(500).send({ message: "Server error", error: error.message });
//     }
// }
// module.exports = { signUp, login , getAllUser };

// ================================================================================= //


// Updated userController.js (EJS-compatible)
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        if (!email || !password || !userName) {
            return res.render("signup", { error: "All fields are required" });
        }

        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.render("signup", { error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ userName, email, password: hashedPassword, role });

        res.redirect("/user/login");
    } catch (error) {
        console.error(error);
        res.render("signup", { error: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", { error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.render("login", { error: "User does not exist. Please sign up." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render("login", { error: "Incorrect password" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.cookie("token", token);
        res.redirect("/products");
    } catch (error) {
        console.error(error);
        res.render("login", { error: "Server error" });
    }
};

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.render("users", { users });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

module.exports = { signUp, login, getAllUser };
