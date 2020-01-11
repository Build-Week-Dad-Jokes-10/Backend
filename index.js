const express = require('express');
const cors = require('cors');
const helmet = require('helmet')

const server = express();
server.use(cors());
server.use(express.json());
server.use(helmet());

const authRouter = require('./auth/auth-router.js');
server.use('/auth', authRouter);

const jokesRouter = require('./jokes/jokes_router.js');
server.use('/api', jokesRouter);

const PORT = process.env.PORT || 4400;
server.listen(PORT, () => console.log(`Server running on ${PORT}`))