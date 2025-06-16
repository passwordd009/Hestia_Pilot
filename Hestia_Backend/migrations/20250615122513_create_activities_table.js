const { increment } = require("../db");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
return knex.schema.createTable('activities', table => {
  table.increments('id').primary();
  table.string('title');
  table.string('description');
  table.integer('points');
  table.boolean('active');
  table.timestamp('used_at');
  table.timestamp('created_at').defaultTo(knex.fn.now());
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('activities')
};
