const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/auth", authRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
