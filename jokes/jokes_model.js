// const knex = require('knex');
// const config = require('../knexfile');
// const db = knex(config.development);

// this is my first draft model ive been messing with both to see what works. i got some help with the second one so i think that one is better.

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


const db = require('../data/db.js')
module.exports = {
    find,
    findPublicJoke,
    add,
    remove,
    update,
    postJoke,
    getSavedJoke
}
function find() {
    return db('jokes')
}
function findById(id) {
    return db('jokes').where({ id }).first()
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
function postJoke(joke) {
    return db('jokes')
        .insert(joke)
}
function getSavedJoke(username) {
    return db('saved_joke as s').where({username})
    .join('joke as j', 'j.id', 's.joke_id')
    .select('j.id as joke_id', 'j.question', 'j.thumb_ups', 'j.thumb_downs', 'j.joke_owner', 'j.hearts')
}
function remove(id) {
    return db('jokes').where({ id }).del()
}
function update(joke, id) {
    return db('jokes').update(joke).where({ id })
}