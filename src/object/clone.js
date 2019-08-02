/**
 * 
 * @param {any} arg 
 * @return {any} arg深克隆的clone
 */
module.exports = function clone(arg) {
  const type = typeof arg;
  if (type !== 'function' && type !== 'object') {
    return arg;
  }
  if (Object.prototype.toString.call(arg) == '[object Object]') {
    const res = {};
    const keys = Object.keys(arg);
    keys.map((key) => {
      res[key] = clone(arg[key]);
    });
    return res;
  }
  if (Object.prototype.toString.call(arg) === '[object Array]') {
    return arg.map((item) => clone(item));
  }
  return arg;
}