const fs = require("fs/promises");

exports.getMeals = async (req, res) => {
    try {
        const meals = await fs.readFile("data/available-meals.json", "utf8");
        res.json(JSON.parse(meals));
    } catch (error) {
        res.status(500).json({ message: "Could not fetch meals." });
    }
};