const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

var routers = require("./routes");

// Server Configurations
const app = express();

// parse application/json
app.use(bodyParser.json());

// APIs logger
app.use(logger("dev"));

// cookieParser error
app.use(cookieParser());

// cors error
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// swagger APIs docs
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load(__dirname + "/api-docs.yml"))
);

app.use("/api/v1/", routers.userAuth);
app.use("/api/v1/", routers.product);

module.exports = app;
