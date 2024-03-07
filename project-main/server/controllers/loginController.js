// controllers/loginController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../utils/db.js';

const login = (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM user WHERE username=?';
  db.query(sql, [username], (err, data) => {
    if (err) return res.json({ Error: " login error " });
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (err, response) => {
        if (err) return res.json({ Error: " password compare error " });
        if (response) {
          const token = jwt.sign({ username: data[0].username }, "jwt-secret-key", { expiresIn: '1d' });
          res.cookie('token', token);
          return res.json({ Status: "Success" });
        } else {
          return res.json({ Error: "password not matched" });
        }
      });
    } else {
      return res.json({ Error: "No username existed" });
    }
  });
};

export default login;
