exports.up = (knex) => {
    return knex.schema.createTable("users", (table) => {
      table.increments('id').primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("phone").notNullable();
      table.string("password").notNullable()
      table.boolean("isAdmin").defaultTo("false");
      table.increment("book_id").index();

      table.integrer("book_id").unsigned().index().references("id").inTable("book")
     })
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTableIfExists("users")
  
  };