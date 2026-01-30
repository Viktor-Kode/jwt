import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; // 1. Must import dotenv
import route from "./routes/useRoutes.js";
dotenv.config(); // 2. Must initialize it to read your .env file

const app = express();
app.use(express.json()); // 3. Don't forget this to read JSON bodies!

app.use('/user', route)
const Mongo_URI ="mongodb://127.0.0.1:27017/taskmanager";
const PORT = 5000;

// 4. Fixed syntax for .catch and removed extra arguments in listen
mongoose.connect(Mongo_URI)
    .then(() => {
        console.log(" Database is running fine");
    })
    .catch((err) => {
        console.error("Database error:", err.message);
    });

app.listen(PORT, () => {
    console.log(` Running server on port ${PORT}`);
});