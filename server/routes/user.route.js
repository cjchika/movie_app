import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 0 })
    .withMessage("Username minimum 8 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("Username already in used");
    }),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 0 })
    .withMessage("Password minimum 8 characters"),
  body("confirmPassword")
    .exists()
    .withMessage("confirmPassword is required")
    .isLength({ min: 0 })
    .withMessage("Confirm password minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Confirm Password does not match");
      return true;
    }),
  body("displayName")
    .exists()
    .withMessage("displatName is required")
    .isLength({ min: 0 })
    .withMessage("displayName minimum 8 characters"),
  requestHandler.validate,
  userController.signup
);

router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 0 })
    .withMessage("username minimum 8 characters"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 0 })
    .withMessage("password minimum 8 characters"),
  requestHandler.validate,
  userController.signin
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 0 })
    .withMessage("password minimum 8 characters"),
  body("newPassword")
    .exists()
    .withMessage("newPassword is required")
    .isLength({ min: 0 })
    .withMessage("newPassword minimum 8 characters"),
  body("confirmNewPassword")
    .exists()
    .withMessage("confirmNewPassword is required")
    .isLength({ min: 0 })
    .withMessage("confirmNewPassword minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Confirm Password does not match");
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);

export default router;
