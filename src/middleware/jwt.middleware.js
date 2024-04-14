import jwt from "jsonwebtoken";

const verificationJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const verificationToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verificationToken;
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
export default verificationJWT;
