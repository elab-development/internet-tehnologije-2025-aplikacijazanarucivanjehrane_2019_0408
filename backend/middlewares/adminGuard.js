// protecting admin routes

const fs = require("fs/promises");

const adminGuard = async (req, res, next) => {
    const email = req.headers["x-user-email"];

    if (!email) {
        return res.status(401).json({ message: "Unauthorized." });
    }

    try {
        const usersRaw = await fs.readFile("data/users.json", "utf8");
        const users = JSON.parse(usersRaw);
        const user = users.find((u) => u.email === email);

        if (!user || user.type !== "admin") {
            return res.status(403).json({ message: "Forbidden. Admins only." });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Authorization failed." });
    }
};

module.exports = adminGuard;