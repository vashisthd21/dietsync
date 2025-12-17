import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  if ( 
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Auth Header:", req.headers.authorization);

  }

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};
