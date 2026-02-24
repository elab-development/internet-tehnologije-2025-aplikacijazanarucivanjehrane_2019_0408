const mysql = require('mysql2/promise');

async function testDB() {
    try {
        console.log('Testing connection to MySQL...');
        
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306
        });
        
        console.log('✅ Connected successfully!');
        
        const [databases] = await connection.query('SHOW DATABASES');
        console.log('Available databases:', databases.map(db => db.Database));
        
        await connection.end();
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.error('Full error:', error);
    }
}

testDB();