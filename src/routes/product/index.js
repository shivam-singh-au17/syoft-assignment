const express = require("express");
const router = express.Router();
const {
  validateParams,
  authentication,
  authorization,
} = require("../../middlewares");
const validationProduct = require("./validation");
const Product = require("../../models/product");
const productService = require("./service");

router.post(
  "/product/",
  authentication,
  authorization(["admin"]),
  validateParams(validationProduct.create),
  productService(Product).create
);

router.get(
  "/products/",
  authentication,
  authorization(["admin", "manager"]),
  productService(Product).get
);

router.patch(
  "/product/:id",
  authentication,
  authorization(["admin", "manager"]),
  validateParams(validationProduct.update),
  productService(Product).update
);

router.delete(
  "/product/:id",
  authentication,
  authorization(["admin"]),
  productService(Product).deleteOne
);

module.exports = router;
