const fs = require("fs/promises");
const bcrypt = require("bcrypt");
const { syncUsers } = require('../database/utils/dbSync');

const USERS_FILE = "data/users.json";

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required." });
    }

    if (!email.includes("@")) {
        return res.status(400).json({ message: "Invalid email address." });
    }

    if (password.trim().length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    try {
        const usersRaw = await fs.readFile(USERS_FILE, "utf8");
        const users = JSON.parse(usersRaw);

        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = {
            id: (Math.random() * 1000000).toString(),
            name,
            email,
            password: hashedPassword,
            type: email === "misa.savic.2000@gmail.com" ? "admin" : "regular",
        };

        users.push(newUser);
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

        console.log('📊 About to sync users. Count:', users.length);
        console.log('📊 New user email:', newUser.email);

        // sync to database
        await syncUsers(users);
        console.log('✅ User synced to database');

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Could not register user." });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const usersRaw = await fs.readFile(USERS_FILE, "utf8");
        const users = JSON.parse(usersRaw);

        const user = users.find((u) => u.email === email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Return user info without password
        res.status(200).json({
            message: "Login successful.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                type: user.type,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Could not log in." });
    }
};