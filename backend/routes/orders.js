const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid order data
 *       500:
 *         description: Server error
 */
router.post("/", ordersController.createOrder);

module.exports = router;