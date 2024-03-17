import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import User from "../mongoDB/models/user.js";

dotenv.config();

const router = express.Router();

// register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = await req.body;

        if (!(name && email && password)) {
            return res.status(400).send("All inputs required");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        const token = jwt.sign(
            {
                user_id: newUser._id,
                email,
                name,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "2h",
            }
        );

        newUser.token = token;

        const userWithoutPassword = {
            ...newUser.toObject(),
            password: undefined,
        };

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Something went wrong" });
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });

        if (foundUser) {
            const validPassword = await bcrypt.compare(password, foundUser.password);
            if (validPassword) {
                const token = jwt.sign(
                    {
                        user_id: foundUser._id,
                        email,
                        name: foundUser.name,
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                foundUser.token = token;
                const userWithoutPassword = {
                    ...foundUser.toObject(),
                    password: undefined,
                };
                res.status(201).json(userWithoutPassword);
            } else {
                res.status(400).json({ error: "Invalid username or password" });
            }
        } else {
            res.status(400).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Something went wrong" });
    }
});

export default router;
