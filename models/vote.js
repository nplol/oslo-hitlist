"use strict";

const db = require('../database');
const util = require('util');
const validator = require('./helpers/validator');

let Vote = db.Model.extend({

  tableName: 'votes',

  idAttribute: 'id',

  hasTimestamps: true,

  initialize () {
    this.on('saving', this.validate);
  },

  validations: {
    user:   ['required', 'unique'],
    vote:   ['required', 'number'] 
  },

  validate () {
    return validator.run(this);
  }

});

module.exports = Vote;
