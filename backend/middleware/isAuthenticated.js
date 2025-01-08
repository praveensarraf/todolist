import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "Access denied. User not authenticated!",
        success: false,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token!",
        success: false,
      });
    }
    
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    res.status(500).json({
      message: "Authentication failed due to an internal error.",
      success: false,
    });
  }
};

export default isAuthenticated;
