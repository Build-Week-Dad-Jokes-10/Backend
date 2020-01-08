const router = require('express').Router();
const User = require('./user-model.js');
const bcrypt = require('bcryptjs');

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
})

module.exports = router;