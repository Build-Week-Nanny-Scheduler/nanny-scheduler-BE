const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const restricted = require("../auth/restrictedMiddleware.js");
const authRouter = require("../auth/authRouter.js");
const usersRouter = require("../users/usersRouter.js");
const requestsRouter = require("../requests/requestsRouter.js");


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Sanity Check" });
});

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);
server.use("/api/requests", restricted, requestsRouter);


module.exports = server;