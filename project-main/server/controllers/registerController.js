import bcrypt from 'bcrypt';
import db from '../utils/db.js';

const salt = 10;

const register = (req, res) => {
  const { username, password, email, company_name } = req.body;

  // Check if the username already exists in the database
  db.query("SELECT * FROM user WHERE username = ?", [username], (err, rows) => {
    if (err) {
      console.error("Error checking username:", err);
      return res.status(500).json({ error: "Error checking username" });
    }

    if (rows.length > 0) {
      // Username already exists, return an error
      return res.json({ Error: "User already exists" });
    }

    // Username does not exist, proceed with registration
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Insert the new user into the database, including email and company_name
    const sql = "INSERT INTO user(username, password, email, company_name) VALUES (?, ?, ?, ?)";
    db.query(sql, [username, hashedPassword, email, company_name], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ error: "Error inserting data into the database" });
      }
      return res.json({ Status: "Success" });
    });
  });
};

export default register;
