import jwt from "jsonwebtoken";

const jwtSecretKey = "secret";
export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecretKey);
      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Неверный токен" });
    }
  } else {
    return res.status(403).json({ message: "Нет доступа" });
  }
};
