const express = require('express');
const cors = require('cors');
const helmet =require('helmet');

const authRouter = require('./auth/authRouter.js');
const usersRouter = require('./users/usersRouter.js');

const restricted = require('./auth/restrictedMiddleware.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter)
server.use('api/users', restricted, usersRouter)

server.get('/', (req,res) => {
    res.status(200).json({
        api: 'Ready to roll!'
    })
})

module.exports = server;