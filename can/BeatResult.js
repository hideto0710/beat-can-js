'use strict';

module.exports = function(code, message) {
  this.code = code;
  this.message = message || '';
  this.toString = function() {
    return this.code + ': ' + this.message;
  }
};
