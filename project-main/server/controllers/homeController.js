

const homeController= (req, res) => {
  if (req.username) {
    // If user is authenticated, render the home page with username
    return res.json({ Status: "Success", username: req.username });
  } else {
    // If user is not authenticated, return an error message
    return res.status(401).json({ Error: "Unauthorized" });
  }
};

export default homeController;
