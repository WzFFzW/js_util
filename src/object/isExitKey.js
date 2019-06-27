/**
 *
 *  判断对象中是否存在某个属性
 *  @param {string} path 判断属性的路径
 *  @return {boolean} 是否存在该属性
 *   
 *  @example 
 *  const object = {a: {b: 1}};
 *  isExitKey('a.b') => true
 */
const isExitKey = function(object, path) {
  if (typeof path !== 'string' || typeof object !== 'object') {
    throw new Error('path必须是字符类型');
  }
  const keys = path.split('.');
  const { length } = keys;
  let index = -1;
  let result = false;
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  while ( ++index < length ) {
    const key = keys[index];
    if (!key) {
      throw new Error(`传入的属性非法${path}`);
    }
    if (!(result = (object[key] != null && hasOwnProperty.call(object, key)))) {
      break;
    }
    object = object[key];
  }
  return result;
}

module.exports = isExitKey;