/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('reward_redemptions', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.integer('vendor_id').unsigned().notNullable();
      table.integer('reward_id').unsigned().notNullable();
      table.string('code').unique().notNullable();
      table.enu('status', ['pending', 'redeemed', 'cancelled']).defaultTo('pending');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('redeemed_at');
  
      table.foreign('user_id').references('users.id');
      table.foreign('vendor_id').references('vendors.id');
      table.foreign('reward_id').references('rewards.id');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('reward_redemptions');
  };
  
