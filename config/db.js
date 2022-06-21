// npm i knex
require('dotenv').config()

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: process.env.password,
    database: "JOINING_PRACTICE",
  },
});

knex.schema
  .createTable("Test", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.unique("email");
    table.string("password");
  })
  .then(() => {
    console.log("Table Create succesfully");
  }).catch((err)=>{
        console.log(err.message);
  })

module.exports = knex