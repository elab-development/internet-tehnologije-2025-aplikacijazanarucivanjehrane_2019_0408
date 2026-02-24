// Database Sync Module
// Syncs JSON file changes to MySQL database
const fs = require('fs').promises;
const { pool } = require('../config/db');

// ============================================
// Sync Users to Database
// ============================================
async function syncUsers(users) {
    try {
        for (const user of users) {
            await pool.query(
                `INSERT INTO customers (id, name, email, password, type) 
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                 name = VALUES(name), 
                 type = VALUES(type)`,
                [user.id, user.name, user.email, user.password, user.type]
            );
        }
        console.log('✅ Users synced to database');
    } catch (error) {
        console.error('❌ Error syncing users:', error);
    }
}

// ============================================
// Sync Meals to Database
// ============================================
async function syncMeals(meals) {
    try {
        // Get all existing meal IDs from database
        const [dbMeals] = await pool.query('SELECT id FROM meals');
        const dbMealIds = new Set(dbMeals.map(m => m.id));
        const jsonMealIds = new Set(meals.map(m => m.id));

        // Insert or update meals
        for (const meal of meals) {
            await pool.query(
                `INSERT INTO meals (id, name, description, price, image) 
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                 name = VALUES(name), 
                 description = VALUES(description), 
                 price = VALUES(price), 
                 image = VALUES(image)`,
                [meal.id, meal.name, meal.description, meal.price, meal.image]
            );
        }

        // Delete meals that no longer exist in JSON
        for (const dbMealId of dbMealIds) {
            if (!jsonMealIds.has(dbMealId)) {
                await pool.query('DELETE FROM meals WHERE id = ?', [dbMealId]);
                console.log(`🗑️  Deleted meal ${dbMealId} from database`);
            }
        }

        console.log('✅ Meals synced to database');
    } catch (error) {
        console.error('❌ Error syncing meals:', error);
    }
}

// ============================================
// Sync Orders to Database
// ============================================
async function syncOrders(orders) {
    try {
        for (const order of orders) {
            // Find customer_id by email
            const [customerRows] = await pool.query(
                'SELECT id FROM customers WHERE email = ?',
                [order.customer.email]
            );
            const customerId = customerRows.length > 0 ? customerRows[0].id : null;

            // Check if order already exists
            const [existingOrder] = await pool.query(
                'SELECT id FROM orders WHERE id = ?',
                [order.id]
            );

            if (existingOrder.length === 0) {
                // Insert new order
                await pool.query(
                    `INSERT INTO orders (id, customer_id, customer_name, customer_email, street, postal_code, city, total_price) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        order.id,
                        customerId,
                        order.customer.name,
                        order.customer.email,
                        order.customer.street,
                        order.customer['postal-code'],
                        order.customer.city,
                        order.totalPrice
                    ]
                );

                // Insert order items
                if (order.items && order.items.length > 0) {
                    for (const item of order.items) {
                        await pool.query(
                            `INSERT INTO order_items (order_id, meal_id, meal_name, quantity, price) 
                             VALUES (?, ?, ?, ?, ?)`,
                            [order.id, item.id, item.name, item.quantity, item.price]
                        );
                    }
                }

                console.log(`✅ New order ${order.id} synced to database`);
            }
        }
    } catch (error) {
        console.error('❌ Error syncing orders:', error);
    }
}

module.exports = { syncUsers, syncMeals, syncOrders };