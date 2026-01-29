import express from "express"
import { login, register } from "../controllers/useController.js";
import { verifyToken } from "../authMiddleware.js"; 

const route = express.Router();

route.post("/register", register);
route.post("/login", login)

// This route is PROTECTED
route.get("/profile", verifyToken, (req, res) => {
    res.json({ 
        message: "Welcome to the VIP Dashboard!", 
        yourId: req.user.id 
    });
});
export default route;