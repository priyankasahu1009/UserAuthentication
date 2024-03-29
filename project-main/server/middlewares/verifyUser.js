// middlewares/verifyUser.js
import jwt from 'jsonwebtoken';

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "you are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "token is not okay" });
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

export default verifyUser;
