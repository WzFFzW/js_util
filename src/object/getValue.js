const isExitKey = require('./isExitKey');
/**
 *
 *  获取对象中的值
 *  @param {string} path 判断属性的路径
 *  @return {any} 该属性的值，如果不存在就是null
 *   
 *  @example 
 *  const object = {a: {b: 1}};
 *  object.getValue('a.b') => 1
 * object.getValue('a.c') => null
 */
const getValue = function(object, path) {
  if (!isExitKey(object, path)) {
    return null;
  }
  const keys = path.split('.');
  keys.map((key) => { object = object[key] });
  return object;
}

module.exports = getValue;