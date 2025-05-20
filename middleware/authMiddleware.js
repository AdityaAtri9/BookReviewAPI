const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const header = req.header('Authorization');

    // If there's no Authorization header, reject
    if(!header) { 
        return res.status(401).json({ error: 'No token provided'});
    }
    const token = header.split(' ')[1]; //Bearer <token>
    if (!token) {
        return res.status(401).json({ error: 'Malformed token' }); // Additional safety check
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        return next();
    } catch {
        return res.status(401).json({ error: 'Invalid token'});
    }
}

module.exports = authMiddleware;