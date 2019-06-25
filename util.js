// 克隆
function clone(arg) {
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

/**
 * 
 * 生成字符串，勒色于classnames这个包的作用
 */
function classnames() {
  let res = [];
  const args = arguments;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const type = typeof arg;
    if (!arg) {
      continue;
    } else if (!Array.isArray(arg) && type === 'object') {
      Object.keys(arg).map((key) =>  arg[key] && res.push(key));
    } else if (Array.isArray(arg)) {
      arg.map((item) => res.push(classnames(item)));
    } else if (type === 'function') {
      res.push(arg());
    } else {
      res.push(arg);
    }
  }
  return res.join(' ');
}

/**
 * compose 
 * @param {function[]} 
 * 
 * @return compose之后的函数
 * @example
 * fn = compose(fn1, fn2, fn3);
 * // 链式调用，最终返回一个数组
 * fn => [fn3(arg)];
 */
const compose = (...fns) => (...arg) => fns.reduce((init, fn) => [fn(...init)], arg);

/**
 * @summary object的克隆
 * @param {Object} obj
 * 
 */
function clone(obj) {
  if (typeof obj !== 'object') {
    throw new Error('参数错误');
  }
  const o = {};
  const keys = Object.keys(obj);
  keys.map(function(key) {
    const v = obj[key];
    if (Object.prototype.toString.call(v) === '[object Object]' || Object.prototype.toString.call(v) === '[object Array]') {
      o[key] = clone(v);
    }
    o[key] = v;
  })
  return o;
}