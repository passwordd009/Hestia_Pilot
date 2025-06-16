/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('vendors', table => {
        table.increments('id').primary();
        table.string('business_name')
        table.string('first_name');
        table.string('last_name');
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.timestamps(true, true);
        table.string('reset_token');
        table.timestamp('reset_token_expires');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('vendors');
};
