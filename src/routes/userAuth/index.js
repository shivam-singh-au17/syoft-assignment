const express = require("express");
const router = express.Router();
const { validateParams } = require("../../middlewares");
const validationUserAuth = require("./validation");
const userAuthService = require("./service");
const UserAuth = require("../../models/userAuth");

router.post(
  "/register",
  validateParams(validationUserAuth.register),
  userAuthService(UserAuth).register
);

router.post(
  "/login",
  validateParams(validationUserAuth.login),
  userAuthService(UserAuth).login
);

router.get("/alluser", userAuthService(UserAuth).getAllUser);

module.exports = router;
