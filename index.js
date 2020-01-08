const express = require('express');

const server = express();
server.use(express.json());

const authRouter = require('./auth/auth-router.js');
server.use('/auth', authRouter);

const PORT = process.env.PORT || 4400;
server.listen(PORT, () => console.log(`Server running on ${PORT}`))