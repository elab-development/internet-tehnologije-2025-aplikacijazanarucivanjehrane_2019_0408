const express = require("express");
const router = express.Router();
const mealsController = require("../controllers/mealsController");

/**
 * @swagger
 * /meals:
 *   get:
 *     summary: Get all available meals
 *     tags: [Meals]
 *     responses:
 *       200:
 *         description: List of all meals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meal'
 *       500:
 *         description: Server error
 */
router.get("/", mealsController.getMeals);

module.exports = router;