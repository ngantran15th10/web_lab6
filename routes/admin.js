const express = require('express');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Admin-only dashboard endpoint
router.get('/dashboard', authMiddleware, roleCheck('admin'), (req, res) => {
    res.json({
        message: 'Welcome to admin dashboard',
        user: {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role
        },
        data: {
            info: 'This is admin-only content'
        }
    });
});

module.exports = router;
