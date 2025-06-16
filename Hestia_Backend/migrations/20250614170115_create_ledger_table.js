/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ledger', (table) => {
        table.increments('id').primary();
        table.uuid('transaction_id').defaultTo(knex.raw('gen_random_uuid()')).notNullable();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('vendor_id').unsigned().references('id').inTable('vendors').onDelete('CASCADE');
        table.integer('amount').notNullable();
        table.enu('type', ['earn', 'spend', 'transfer', 'adjustment']).notNullable();
        table.text('description'); 
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('ledger');
};
