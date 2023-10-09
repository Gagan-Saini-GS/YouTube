const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({ noCors: true });
const cors = require("cors");

// Custom middleware to normalize email addresses to lowercase
server.use((req, res, next) => {
  if (req.body && req.body.email) {
    req.body.email = req.body.email.toLowerCase(); // Normalize email to lowercase
  }
  next();
});

// Set up CORS headers before using json-server middleware
server.use(cors());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

server.use(middlewares);
server.use(router);
