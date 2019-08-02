/**
 * @param {any} arg
 * @returns {boolean}
 */
function isObj(arg) {
  return Object.prototype.toString.call({}) === '[object Object]';
}

module.exports = isObj;