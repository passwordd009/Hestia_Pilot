/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('users', function(table) {
        table.string('qr_code').unique();
        table.string('qr_url');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('users', function(table) {
        table.dropColumn('qr_code');
        table.dropColumn('qr_url');
      });
};
