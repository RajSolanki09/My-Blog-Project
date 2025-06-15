const jwt = require('jsonwebtoken');
// Middleware to check if the user is authenticated
const authCheck = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).send(" Unauthorized: No token provided So Login first");
    }

    try {
        const user = jwt.verify(token, process.env.JWT_KEY);
        req.user = user // add user to request
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        return res.status(403).send("Unauthorized: Invalid token");
    }

}

//role check middleware
const onlyAdmin = (req, res, next) => {
    if(req.user.role !== 'admin') {
        return res.status(403).send("Admin access only");
    }
    next()
}

module.exports = {
    authCheck,
    onlyAdmin
};