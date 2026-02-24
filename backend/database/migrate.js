// Migration script: Populate MySQL database from JSON files
const fs = require('fs').promises;
const path = require('path');
const { pool } = require('./config/db');

async function migrateData() {
    console.log('🚀 Starting database migration from JSON files...\n');

    try {
        // ============================================
        // 1. Migrate Users (customers)
        // ============================================
        console.log('📊 Migrating users...');
        const usersData = await fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8');        
        const users = JSON.parse(usersData);

        for (const user of users) {
            await pool.query(
                `INSERT INTO customers (id, name, email, password, type) 
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                 name = VALUES(name), 
                 email = VALUES(email), 
                 password = VALUES(password), 
                 type = VALUES(type)`,
                [user.id, user.name, user.email, user.password, user.type]
            );
        }
        console.log(`✅ Migrated ${users.length} users\n`);

        // ============================================
        // 2. Migrate Meals
        // ============================================
        console.log('📊 Migrating meals...');
        const mealsData = await fs.readFile(path.join(__dirname, '../data/available-meals.json'), 'utf8');
        const meals = JSON.parse(mealsData);

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
        console.log(`✅ Migrated ${meals.length} meals\n`);

        // ============================================
        // 3. Migrate Orders
        // ============================================
        console.log('📊 Migrating orders...');
        const ordersData = await fs.readFile(path.join(__dirname, '../data/orders.json'), 'utf8');
        const orders = JSON.parse(ordersData);

        for (const order of orders) {
            // Find customer_id by email (if exists)
            const [customerRows] = await pool.query(
                'SELECT id FROM customers WHERE email = ?',
                [order.customer.email]
            );
            const customerId = customerRows.length > 0 ? customerRows[0].id : null;

            // Insert order
            await pool.query(
                `INSERT INTO orders (id, customer_id, customer_name, customer_email, street, postal_code, city, total_price) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                 customer_id = VALUES(customer_id),
                 customer_name = VALUES(customer_name),
                 customer_email = VALUES(customer_email),
                 street = VALUES(street),
                 postal_code = VALUES(postal_code),
                 city = VALUES(city),
                 total_price = VALUES(total_price)`,
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
        }
        console.log(`✅ Migrated ${orders.length} orders\n`);

        console.log('🎉 Migration completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrateData();