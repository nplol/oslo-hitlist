"use strict";

const db = require('../database');
const util = require('util');

let Place = db.Model.extend({
  tableName: 'places',

  hasTimestamps: true,

  initialize () {
    this.set({ rating: 0 });
    this.on('saving', this.validate);
  },

  validations: {
    name: ['required', 'unique'],
    rating: ['required', 'number']
  },

  validate () {
    return new Promise(function (resolve, reject) {
      let uniquePromise = null;
      Object.keys(this.validations).forEach(function (key) {
        this.validations[key].forEach(function (rule) {
          let value = this.get(key);
           switch(rule) {
            case 'required':
              if( typeof(value) === 'undefined' ||
                  typeof(value) === null || value === '') {
                reject(`Required field: ${key} is null`);
              }
              break;
            case 'unique':
              var query = { require: true };
              query[key] = this.get(key);
              uniquePromise = this.fetch(query)
              .then(function (record) {
                reject(`Unique field ${key} is not unique`);
              }).catch(function () { resolve(); });
              break;
            case 'number':
              break;
            default:
              reject(`${rule} is not a valid validation rule`);
              break;
          }
        }.bind(this));
      }.bind(this));
      if(uniquePromise === null) resolve();
      // all validations passed
    }.bind(this));
  }
});

module.exports = Place;
