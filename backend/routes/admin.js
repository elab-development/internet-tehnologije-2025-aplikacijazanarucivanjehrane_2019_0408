const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminGuard = require("../middlewares/adminGuard");

router.use(adminGuard); // Protect all admin routes

router.get("/orders", adminController.getOrders);
router.get("/users", adminController.getUsers);
router.put("/users/:id", adminController.updateUserType);
router.post("/meals", adminController.addMeal);
router.put("/meals/:id", adminController.editMeal);
router.delete("/meals/:id", adminController.deleteMeal);

module.exports = router;