import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // 1. Get the token from the header
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "No token, authorization denied" });
    }

    try {
        // 2. Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Add the user ID to the request object for later use
        req.user = decoded;
        next(); // Move to the actual route logic
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};