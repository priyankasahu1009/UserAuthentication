// controllers/logoutController.js
const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "success" });
  };
  
  export default logout;
  