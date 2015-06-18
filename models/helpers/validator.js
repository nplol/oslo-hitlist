"use strict";    

const util = require('util');

const validator = {

  run(model) {
    return new Promise(function (resolve, reject) {
      let unique = false;
      Object.keys(model.validations).forEach(function (key) {
        model.validations[key].forEach(function (rule) {
          let value = model.get(key);
           switch(rule) {
            case 'required':
              if(!this.required(value)) 
                reject(`Required field: ${key} is null`);
              break;
            case 'unique':
              unique = true;
              this.unique(model, value, key)
              .then(function () {
                reject(`Unique field ${key} is not unique`);
              }).catch(function (err) { resolve(); });
              break;
            case 'number':
              if(!this.isNumeric(value))
                reject(`Numeric field ${key} is not a number`); 
              break;
            default:
              reject(`${rule} is not a valid validation rule`);
              break;
          }
        }.bind(this));
      }.bind(this));
      // all validations passed
      if(!unique) resolve();
    }.bind(this));
  },

  required (val) {
    return  typeof(val) !== 'undefined' &&
            typeof(val) !== null && val !== '';
  },

  unique (model, val, key) {
    let attrs = {};
    attrs[key] = model.get(key);
    return new model.constructor(attrs).fetch({require: true});
  },

  isNumeric (val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
  }
};
 
module.exports = validator;
