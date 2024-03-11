exports.up = (knex) => {
    return knex.schema.createTable("books", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.string("author").notNullable();
      table.string("category").notNullable();
      table.boolean("available").defaultTo("true");
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('update_at').defaultTo(knex.fn.now());
      table.integer("user_id").unsigned().index().references("id").inTable("users")
    })
  };
  
  
  exports.down = (knex) => {
    return knex.schema.dropTableIfExists("books")
    
  };