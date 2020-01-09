// const knex = require('knex');
// const config = require('../knexfile');
// const db = knex(config.development);



// function find() {
//     return db('jokes').select('id', 'setup', 'punchline', 'username', 'userId');
// }

// async function add(joke) {
//     const [id] = await db('jokes').insert(joke);

//     return findById(id);
// }

// function findById(id) {
//     return db('jokes')
//     .where({ id })
//     .first();
// }

// function remove(id) {
//     return db('jokes')
//     .where({ id })
//     .del();
// }

// async function update(id, changes) {
//     await db('jokes')
//     .where({ id })
//     .update(changes);

//     return findById(id);
// }

// module.exports = {
//     find,
//     findById,
//     add,
//     remove,
//     update
// };


const db = require('../data/dbConfig')
module.exports = {
    find,
    findPublicJoke,
    add,
    remove,
    update,
    saveJoke,
    getSavedJoke
}
function find() {
    return db('joke')
}
function findById(id) {
    return db('joke').where({ id }).first()
}
function findPublicJoke() {
    return db('joke').where({ public: true })
}
function add(joke) {
    return db('joke').insert(joke)
}
function findSavedById(id) {
    return db('saved_joke').where({ id }).first()
}
function saveJoke(username, joke_id) {
    return db('saved_joke')
        .insert({ username, joke_id })
        .then(() => {
            return findSavedById(joke_id)
        }).then((joke) => {
            return findById(joke.id)
        })
}
function getSavedJoke(username) {
    return db('saved_joke as s').where({username})
    .join('joke as j', 'j.id', 's.joke_id')
    .select('j.id as joke_id', 'j.question', 'j.thumb_ups', 'j.thumb_downs', 'j.joke_owner', 'j.hearts')
}
function remove(id) {
    return db('joke').where({ id }).del()
}
function update(id, changes) {
    return db('joke').update(changes).where({ id }).then(ids => {
        return findById(ids)
    })
}