const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({error: 'Access denied, no token' });

    const token = authHeader.replace('Bearer ', '')

    try {
        console.log(
            "JWT secret loaded during verification:",
            !!process.env.JWT_SECRET
        );

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log("JWT verification successful");
        console.log("JWT payload:", payload);

        const user = await UserModel.findById(payload.userId);
        console.log("User found:", !!user);
         
        if(!user) {
            return res.status(404).json({ message: "User not found" })
        }

        req.user = user;
        console.log("Authentication successful");
        next()

    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token'})
    }
};

module.exports = requireAuth;