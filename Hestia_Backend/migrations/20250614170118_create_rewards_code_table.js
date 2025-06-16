/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('reward_codes', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable()
          .references('id').inTable('users')
          .onDelete('CASCADE');
    
        table.integer('reward_id').unsigned().notNullable()
          .references('id').inTable('rewards')
          .onDelete('CASCADE');
    
        table.string('code', 16).notNullable().unique(); // e.g., "A7X9Q21KJ2"
    
        table.boolean('used').defaultTo(false);
        table.timestamp('used_at');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('reward_codes');
};
