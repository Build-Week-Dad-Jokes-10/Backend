const db = require('../data/db.js');

function insert(user) {
    return db('users')
    .insert(user, 'id')
    .then(([id]) => id);
}

module.exports = {
    insert
}