const app = require("./server");
const http = require("http");
require("dotenv").config();
const dbConnection = require("./connections/dbConnection");

// Get port from environment.
const port = process.env.PORT || "3000";

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, async () => {
    console.log("Server Listening PORT:", port);
    await dbConnection();
});
