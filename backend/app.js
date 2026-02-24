const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./middlewares/cors");
const { testConnection } = require('./database/config/db');

const mealsRoutes = require("./routes/meals");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors); // Use CORS middleware

app.use("/meals", mealsRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

testConnection();