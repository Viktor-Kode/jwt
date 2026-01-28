import user from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    try {
        const {email, name, password}= req.body

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new user({email, name, password: hashPassword})
        await newUser.save()
        res.status(201).json({ message: "User created locally!" });

    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password}= req.body

        const findUser = await user.findOne({email})
        if (!findUser) {
            res.status(401).json({
                message:"user not found"
            })
        }
        const isMatch = await bcrypt.compare(password, findUser.password)
        if (!isMatch) return res.status(401).json({ message: "Wrong password" });

        const token = jwt.sign(
            {id: findUser._id},
           process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.status(200).json({message: "Login Success!", token })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}