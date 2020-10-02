const express = require('express');
const projectsRouter = require('../projects-router');
const actionsRouter = require('../actions-router');
const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.status(200).json({
        message: "This is working.",
        environment: process.env.NODE_ENV
    });
});

module.exports = server;