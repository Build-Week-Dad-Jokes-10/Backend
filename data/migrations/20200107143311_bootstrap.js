
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('username').unique().notNullable();
        tbl.string('password').notNullable();
    })
    .createTable('jokes', tbl => {
        tbl.increments();
        tbl.string('setup');
        tbl.string('punchline');
        tbl.integer('likes').default(0);
        tbl.integer('dislikes').default(0);
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');        
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('jokes')
    .dropTableIfExists('users')
};
