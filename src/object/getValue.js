const isExitKey = require('./isExitKey');
const isObj = require('./isObj');
/**
 *
 *  获取对象中的值
 *  @param {string} path 判断属性的路径
 *  @return {any} 该属性的值，如果不存在就是null
 *   
 *  @example 
 *  const object = {a: {b: 1}};
 *  js_util.getValue(object, 'a.b') => 1;
 *  js_util.getValue(object, 'a.c') => null;
 */
const getValue = function(object, path) {
  if (!isObj) {
    throw new Error('getValue的参数必须是obj');
  }
  if (!isExitKey(object, path)) {
    return null;
  }
  const keys = path.split('.');
  keys.map((key) => { object = object[key] });
  return object;
}

module.exports = getValue;