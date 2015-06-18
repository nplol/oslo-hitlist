"use strict";

const db = require('../database');
const util = require('util');
const validator = require('./helpers/validator');

let Place = db.Model.extend({

  tableName: 'places',

  defaults: {
    rating: 0
  },

  hasTimestamps: true,

  initialize () {
    this.on('saving', this.validate);
  },

  validations: {
    name: ['required', 'unique'],
    rating: ['required', 'number']
  },

  validate () {
    return validator.run(this);
  }
});

module.exports = Place;
