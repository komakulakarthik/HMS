// middlewares/authMiddleware.js
module.exports = (req, res, next) => {
    console.log('Session:', req.session); // Log session data for debugging
    if (req.session.adminId) { // Change 'user' to 'adminId' based on your session structure
        next(); // User is authenticated, proceed to the next middleware
    } else {
        return res.status(401).json({ error: 'Unauthorized' }); // User is not authenticated
    }
};
