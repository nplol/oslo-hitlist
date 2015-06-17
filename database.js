"use strict";

const Constants = require('./constants'); 
const knex = require('knex')(Constants.database);
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

//let database = {
  //connect () {
    //new Promise(function (resolve, reject) {
      //resolve(mongoose.connect(Constants.database));
    //}).then(function () {
      //connection = mongoose.connection;
      //connection.on('error', console.error.bind(console, 
        //'connection error')); 
      //connection.once('open', function () {
        //this.initModels();
      //}.bind(this));
    //}.bind(this));
   //},

  //connection () {
    //return connection;
  //},

  //initModels () {
    //Place.init();
  //}
  
//};
