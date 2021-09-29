import express from "express";
import { getUserProfile, loginUser, registerUser, updateUser } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import { myValidaion } from "../utils/validation.js";

const router = express.Router();
router.post("/login",loginUser)
router.post("/", myValidaion, registerUser);
router.route("/profile").get(protect,getUserProfile);
router.patch("/update/:id",protect, updateUser);
export default router;

