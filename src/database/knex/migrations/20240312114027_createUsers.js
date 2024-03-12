
exports.up = (knex) => {
    return knex.schema.createTable("users", (table) => {
      table.increments('id').primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("phone").notNullable();
      table.string("password").notNullable();
      table.boolean("isAdmin").defaultTo(false); 
      
      table.integer("book_id").unsigned().index(); 
      table.foreign("book_id").references("id").inTable("books");
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTableIfExists("users");
  };