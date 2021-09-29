import { body } from "express-validator";

export const myValidaion =

  [
    body("email", "Email length should be 2 to 30 characters")
      .isEmail()
      .isLength({ min: 2, max: 30 }),
    body("name", "Name length should be 10 to 20 characters").isLength({
      min: 4,
      max: 20,
    }),
    body("phone", "Mobile number should contains 10 digits").isLength({
      min: 10,
      max: 10,
    }),
    body("password", "Password length should be 5 to 10 characters").isLength({
      min: 5,
      max: 10,
    }),
  ];
  