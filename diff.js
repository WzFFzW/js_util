/**
 * diff 两个对象数组之间的区别, 现在假定每个对象的key值都是一样的,且是一层的对象（也就是对象的值是不在是对象）
 * 同时假定每个对象都有一个key为index的值表示顺序
 * @param {Object[]} pre_arr diff的对象数组
 * @param {Object[]} next_arr  diff的对象数组
 * @param {String} key 唯一的key值
 * 
 * return 最小变化，从pre到next的最小操作
 */
function diff(pre_arr, next_arr, key) {
  if (!key) {
    throw new TypeError('key值为空');
  }
  const actions = [];
  next_arr.map((item, index) => {
    const pre_index = pre_arr.findIndex((pre_item) => item[key] === pre_item[key]);
    if (pre_index === -1) {
      actions.push({action: 'insert', data: {...item, index: index}});
      return;
    }
    const pre_item = pre_arr[pre_index];
    if (pre_index !== index) {
      // 做移动操作
      actions.push({action: 'update_index', key: item[key], data: [pre_index, index]});
    }
    const update_actions = update(pre_item, item);
    if (update_actions.length) {
      actions.push({action: 'update', key: item[key], data: update_actions});
    }
  });
  pre_arr.map((item, index) => {
    if (next_arr.findIndex((next_item) => item[key] === next_item[key]) === -1) {
      actions.push({action: 'delete', data: index});
    }
  });
  return actions;
}

/**
 * 
 * @param {Object} pre_obj 
 * @param {Object} next_obj 
 * 
 * @returns {Object[]} 更新操作行为
 */
function update(pre_obj, next_obj) {
  const action = [];
  Object.keys(next_obj).map((key) => {
    if (pre_obj[key] !== next_obj[key]) {
      action.push({key, data: next_obj[key]});
    }
  });
  return action;
}