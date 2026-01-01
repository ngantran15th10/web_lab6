const roleCheck = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ error: 'Access denied. No role found.' });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ error: `Access denied. ${requiredRole} role required.` });
        }

        next();
    };
};

module.exports = roleCheck;
