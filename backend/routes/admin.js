const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminGuard = require("../middlewares/adminGuard");

router.use(adminGuard);

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: header
 *         name: x-user-email
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin user email
 *     responses:
 *       200:
 *         description: List of all orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 */
router.get("/orders", adminController.getOrders);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: header
 *         name: x-user-email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all users (without passwords)
 *       403:
 *         description: Forbidden
 */
router.get("/users", adminController.getUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   put:
 *     summary: Update user type (Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-user-email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [regular, loyalty, admin]
 *     responses:
 *       200:
 *         description: User type updated
 *       404:
 *         description: User not found
 */
router.put("/users/:id", adminController.updateUserType);

/**
 * @swagger
 * /admin/meals:
 *   post:
 *     summary: Add new meal (Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: header
 *         name: x-user-email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meal'
 *     responses:
 *       201:
 *         description: Meal added
 */
router.post("/meals", adminController.addMeal);

/**
 * @swagger
 * /admin/meals/{id}:
 *   put:
 *     summary: Edit meal (Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-user-email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meal'
 *     responses:
 *       200:
 *         description: Meal updated
 *       404:
 *         description: Meal not found
 */
router.put("/meals/:id", adminController.editMeal);

/**
 * @swagger
 * /admin/meals/{id}:
 *   delete:
 *     summary: Delete meal (Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-user-email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meal deleted
 *       404:
 *         description: Meal not found
 */
router.delete("/meals/:id", adminController.deleteMeal);

module.exports = router;