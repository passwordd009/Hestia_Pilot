/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('rewards', (table) => {
        table.increments('id').primary();
    
        table.integer('vendor_id').unsigned().notNullable()
          .references('id').inTable('vendors')
          .onDelete('CASCADE');
        table.string('title').notNullable(); // e.g., "Free Drink"
        table.text('description'); // Optional details
        table.integer('cost').notNullable(); // Point cost to redeem
        table.integer('quantity').defaultTo(0); // How many redemptions allowed
        table.boolean('active').defaultTo(true); // Whether the reward is currently redeemable
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('rewards');

};
