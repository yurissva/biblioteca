exports.up = (knex) => {
    return knex.schema.createTable("users", (table) => {
      table.increments('id').primary();
      table.boolean("isAdmin").notNullable();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("phone").notNullable();
      table.string("password").notNullable()
     })
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTableIfExists("users")
  
  };