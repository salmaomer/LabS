require('dotenv').config();
const jwt = require('jsonwebtoken');

function RouteGuard(req, res, next) {
    const  authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader ? authHeader.split(' ')[1] : null;
    const tokenFromQuery = req.query.token;

    const token = tokenFromHeader || tokenFromQuery;
    if (!token) {
        return res.status(401).json({ message: '👾 Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token , process.env.SECRET_KEY);
        console.log("Token decoded successfully:", decoded);
        req.user = decoded; 
        next();         
    } 
    catch (error) {
        console.log("Token verification error:", error.message);
        return res.status(403).json({ message: "Invalid or expired token" });
    }

}

module.exports = RouteGuard;
