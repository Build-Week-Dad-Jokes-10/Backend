const router = require('express').Router();
const User = require('./user-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        username: user.username,
        id: user.id,
    };
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, process.env.JWT_SECRET || 'asdflasdlfl', options);
}

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    User.insert({ username, password: bcrypt.hashSync(password, 8) })
        .then(id => {
            res.status(201).json({ message: 'User Registration Succesful!', id });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error Registering User' });
        })
});
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ 
                    message: 'Login Succesful!',
                    token 
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error logging in' })
        })
});

module.exports = router;