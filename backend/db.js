const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'crm'
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
  });
 
  
  // Event listener for connection errors
  pool.on('error', (err) => {
    console.error('Error connecting to the database:', err);
  });

pool.connect();
module.exports = {
  query: (text, params) => pool.query(text, params)
};