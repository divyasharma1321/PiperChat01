import { body } from "express-validator";

export const emailValidator = () =>
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address");

export const passwordValidator = () =>
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string");

export const strongPasswordValidator = () =>
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 7, max: 64 })
    .withMessage("Password must be between 7 and 64 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character");

export const usernameValidator = () =>
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9._]+$/)
    .withMessage(
      "Username can only contain letters, numbers, underscores, and dots",
    );

export const dobValidator = () =>
  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be in YYYY-MM-DD format")
    .custom((value) => {
      const dob = new Date(value);
      const today = new Date();

      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age -= 1;
      }

      if (age < 13) {
        throw new Error("User must be at least 13 years old");
      }

      return true;
    });

export const otpValidator = () =>
  body("otp_value")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .isNumeric()
    .withMessage("OTP must contain only numbers")
    .isLength({ min: 4, max: 4 })
    .withMessage("OTP must contain exactly 4 digits");
