
const express = require('express');
const session = require('express-session');

const usersRouter = require('./users-router');
const authRouter = require('./auth-router');
const authenticator = require('./authenticator');

const server = express();

const sessionConfig = {
    name: 'monster',
    secret: process.env.SESSION_SECRET || 'keep it secret',
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: process.env.USE_SECURE_COOKIES || false,
        httpOnly: true
    }
}

server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/users", authenticator, usersRouter);
server.use("/api/auth", authRouter);


module.exports = server;