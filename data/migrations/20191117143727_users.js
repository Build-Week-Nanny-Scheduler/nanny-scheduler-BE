
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments("id");
        tbl.string('username', 128).notNullable().unique();
        tbl.string('password', 128).notNullable();
        tbl.string('firstName', 128).notNullable();
        tbl.string('lastName', 128).notNullable();
        tbl.string('city', 255);
        tbl.string('state', 50);
        tbl.string('services', 255);
        tbl.string('rates', 255);
        tbl.string('Available', 255);
        tbl.boolean('canDrive', false);
        tbl.boolean('isNanny', true);
    })
  
    .createTable('requests', tbl => {
        tbl.increments();
        tbl
        .integer("requesterUserID")
        .references("id")
        .inTable("users")
        .onDelete("cascade")
        .onUpdate("cascade");
        tbl
        .integer("nannyUserID")
        .references("id")
        .inTable("users")
        .onDelete("cascade")
        .onUpdate("cascade");
        tbl
        .boolean("accepted")
        .defaultTo(false);
        tbl.string('name', 128).notNullable();
        tbl.string('city',128).notNullable();
        tbl.string('state', 50).notNullable();
        tbl.string('numberOfKids', 25).notNullable();
        tbl.string('kidsAges', 128).notNullable();
        tbl.string('timeNeeded', 128).notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('requests')
    .dropTableIfExists('users')
  };