import jwt from "jsonwebtoken";
import User from '../models/userModel.js'

export const protect = async (req, res, next) => {
    console.log("protect middleware  was called")
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded is",decoded);
        req.user = await User.findById(decoded.id).select("-password");
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
      if (!token) {
        res.staus(401);
        throw new Error("No token ,not Auth");
      }
      next();
    }else{
        res.status(401);
        throw new Error("Not authorized, token failed");

    }
  } catch (error) {
    res.send(error.message);
  }
};
export default protect;
