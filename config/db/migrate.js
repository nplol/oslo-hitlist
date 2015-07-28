"use strict";

const Constants = require('../../constants');
const knex = require('knex')(Constants.database);
const bookshelf = require('bookshelf')(knex);
  
function up () {
  console.log('Creating tables');
  return knex.schema.createTable('places', function (table) {
    table.increments();
    table.string('name').unique().notNullable();
    table.float('rating').notNullable();
    table.timestamps();
  }).then(function(){
    return knex.schema.createTable('votes', function(table) {
      table.increments();
      table.string('user').unique().notNullable();
      table.float('vote').notNullable();
      table.timestamps(); 
    })
  }
  );
}

function down () {
  console.log('Dropping tables.');
  return knex.schema.dropTable('places')
  .then(function() {
    return knex.schema.dropTable('votes')
  })
  .then(function () {
    console.log('Done');
    process.exit();
  });
}

const arg = process.argv.slice(2)[0];

switch(arg) {
  case "up":
    up()
    .then(function () {
      console.log('Done');
    })
    .catch(function (err) {
      console.log('Table already exists');
    })
    .finally(function () {
      process.exit();
    });
    break;
  case "down":
    down()
    .then(function () {
      console.log('Done');
    })
    .catch(function (err) {
      console.log("Table doesn't exist");
    })
    .finally(function () {
      process.exit();
    });
    break;
  default:
    console.error(`Unrecognisable command: ${arg}. 
    Valid commands: up, down`);
}
