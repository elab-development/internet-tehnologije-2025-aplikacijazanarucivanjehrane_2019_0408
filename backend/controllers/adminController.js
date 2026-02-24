const fs = require("fs/promises");
const { syncMeals, syncUsers } = require('../database/utils/dbSync');

const USERS_FILE = "data/users.json";
const ORDERS_FILE = "data/orders.json";
const MEALS_FILE = "data/available-meals.json";

// Update user type
exports.updateUserType = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    // Validate the type
    if (!type || !["regular", "loyalty", "admin"].includes(type)) {
        return res.status(400).json({ message: "Invalid user type." });
    }

    try {
        const usersRaw = await fs.readFile(USERS_FILE, "utf8");
        const users = JSON.parse(usersRaw);

        // Find the user
        const userIndex = users.findIndex((u) => u.id.toString() === id.toString());
        if (userIndex === -1) {
            // looking for error
            // console.log("Looking for ID:", id);
            // console.log("Available IDs:", users.map(u => u.id));
            return res.status(404).json({ message: "User not found." });
        }

        // Prevent changing admin type (safety check)
        if (users[userIndex].type === "admin" && type !== "admin") {
            return res.status(403).json({ message: "Cannot change admin user type." });
        }

        // Update the type
        users[userIndex].type = type;

        // Save back to file
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        // sync users
        await syncUsers(users);
        res.json({ message: "User type updated.", user: users[userIndex] });
    } catch (error) {
        res.status(500).json({ message: "Could not update user type." });
    }
};

// GET all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await fs.readFile(ORDERS_FILE, "utf8");
        res.json(JSON.parse(orders));
    } catch (error) {
        res.status(500).json({ message: "Could not fetch orders." });
    }
};

// GET all users (without passwords)
exports.getUsers = async (req, res) => {
    try {
        const usersRaw = await fs.readFile(USERS_FILE, "utf8");
        const users = JSON.parse(usersRaw);
        const safeUsers = users.map(({ password, ...rest }) => rest);
        res.json(safeUsers);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch users." });
    }
};

// POST add new meal
exports.addMeal = async (req, res) => {
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image) {
        return res.status(400).json({ message: "All meal fields are required." });
    }

    try {
        const mealsRaw = await fs.readFile(MEALS_FILE, "utf8");
        const meals = JSON.parse(mealsRaw);

        const newMeal = {
            id: "m" + (Math.random() * 100000).toFixed(0),
            name,
            description,
            price: parseFloat(price).toFixed(2),
            image,
        };

        meals.push(newMeal);
        await fs.writeFile(MEALS_FILE, JSON.stringify(meals, null, 2));
        // sync meals
        await syncMeals(meals);
        res.status(201).json({ message: "Meal added.", meal: newMeal });
    } catch (error) {
        res.status(500).json({ message: "Could not add meal." });
    }
};

// PUT edit meal
exports.editMeal = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    try {
        const mealsRaw = await fs.readFile(MEALS_FILE, "utf8");
        const meals = JSON.parse(mealsRaw);

        const mealIndex = meals.findIndex((m) => m.id === id);
        if (mealIndex === -1) {
            return res.status(404).json({ message: "Meal not found." });
        }

        meals[mealIndex] = {
            ...meals[mealIndex],
            name: name || meals[mealIndex].name,
            description: description || meals[mealIndex].description,
            price: price ? parseFloat(price).toFixed(2) : meals[mealIndex].price,
            image: image || meals[mealIndex].image,
        };

        await fs.writeFile(MEALS_FILE, JSON.stringify(meals, null, 2));
        // sync meals
        await syncMeals(meals);
        res.json({ message: "Meal updated.", meal: meals[mealIndex] });
    } catch (error) {
        res.status(500).json({ message: "Could not update meal." });
    }
};

// DELETE meal
exports.deleteMeal = async (req, res) => {
    const { id } = req.params;

    try {
        const mealsRaw = await fs.readFile(MEALS_FILE, "utf8");
        const meals = JSON.parse(mealsRaw);

        const mealIndex = meals.findIndex((m) => m.id === id);
        if (mealIndex === -1) {
            return res.status(404).json({ message: "Meal not found." });
        }

        meals.splice(mealIndex, 1);
        await fs.writeFile(MEALS_FILE, JSON.stringify(meals, null, 2));
        // sync meals 
        await syncMeals(meals);
        res.json({ message: "Meal deleted." });
    } catch (error) {
        res.status(500).json({ message: "Could not delete meal." });
    }
};