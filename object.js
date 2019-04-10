/**
 *
 *  判断对象中是否存在某个属性
 *  @param {string} path 判断属性的路径
 *  @return {boolean} 是否存在该属性
 *   
 *  @example 
 *  const object = {a: {b: 1}};
 *  object.isExitKey('a.b') => true
 */
Object.prototype.isExitKey = function(path) {
  if (typeof path !== 'string') {
    throw new Error('path必须是字符类型');
  }
  let object = this;
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
Object.prototype.getValue = function(path) {
  let object = this;
  if (!object.isExitKey(path)) {
    return null;
  }
  const keys = path.split('.');
  keys.map((key) => { object = object[key] });
  return object;
}