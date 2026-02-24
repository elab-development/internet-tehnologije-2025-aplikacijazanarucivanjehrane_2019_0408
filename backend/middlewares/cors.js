const cors = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-user-email");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
};

module.exports = cors;