import mysql from 'mysql2';
import schema from './userSchema.js'; 

// Create a connection to the MySQL database server
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456"
});

// Connect to the MySQL server
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL server:', err);
    return;
  }
  console.log('Connected to MySQL server');

  // Create the database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS UserLogin', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists');

    // Use the 'UserLogin' database
    db.query('USE UserLogin', (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        return;
      }
      console.log('Using database: UserLogin');

      // Check if the 'email' column exists in the 'user' table
      db.query('SHOW COLUMNS FROM user WHERE Field = ?', ['email'], (err, result) => {
        if (err) {
          console.error('Error checking for column:', err);
          return;
        }

        // If the column doesn't exist, add it
        if (result.length === 0) {
          db.query(`
            ALTER TABLE user
            ADD COLUMN ${schema.users.columns.email.name} ${schema.users.columns.email.type} ${schema.users.columns.email.not_null ? 'NOT NULL' : ''} ${schema.users.columns.email.unique ? 'UNIQUE' : ''},
            ADD COLUMN ${schema.users.columns.company_name.name} ${schema.users.columns.company_name.type} ${schema.users.columns.company_name.not_null ? 'NOT NULL' : ''}
          `, (err) => {
            if (err) {
              console.error('Error adding columns to table:', err);
            } else {
              console.log('Email and company_name columns added to table user.');
            }
          });
        } else {
          console.log('Email column already exists in table user.');
        }
      });
    });
  });
});

export default db;
