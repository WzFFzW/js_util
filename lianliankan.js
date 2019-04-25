const direction_map = {
  left: [-1, 0],
  right: [1, 0],
  top: [0, -1],
  bottom: [0, 1],
};
/**
 * 
 * @param {number} depth_x 
 * @param {number} depth_y 
 * @param {array} items 
 */
function creatMap(depth_x, depth_y, items) {
  if ((depth_x * depth_y) % 2 !== 0) {
    throw new Error('x，y乘积必须为偶数');
  }
  const map = [];
  const contents = [];
  let use_items = [];
  for (let i = 0; i < depth_y; i++) {
    const arr = new Array(depth_x).fill(1);
    const content = new Array();
    map.push(arr);
    contents.push(content);
  }
  const fragment = document.createDocumentFragment();
  const halfMapLength = depth_x * depth_y / 2;
  map.map((arr, index) => arr.map((item, item_index) => {
    const div = document.createElement('div');
    div.className = "box";
    div.style.left = item_index * 100 + 'px';
    div.style.top = index * 100 + 'px';
    let t;
    if (index * depth_x + item_index >= halfMapLength) {
      const t_index = Math.floor(use_items.length * Math.random());
      t = use_items[t_index];
      use_items.splice(t_index, 1);
    } else {
      t = items[Math.floor(items.length * Math.random())];
      use_items.push(t);
    }
    div.innerHTML = t;
    contents[index][item_index] = t;
    div.setAttribute('data-x', item_index);
    div.setAttribute('data-y', index);
    fragment.appendChild(div);
  }));
  if (!jiance(map, contents)) {
    alert('没有可以消除的了');
  }
  return {
    map: map,
    contents: contents,
    dom_fragment: fragment,
  };
}

let one = {
  dom: null,
  content: '',
  position: [],
};

const data = creatMap(10, 6, [1,2,3,4,5,6,7,8,9,0,11,12,13,14,15,16,17,18,19,20]);
const map = data.map;
const contents = data.contents;
const container = document.getElementById('container');

container.addEventListener('click', (event) => {
  const x = parseInt(event.target.getAttribute('data-x'));
  const y = parseInt(event.target.getAttribute('data-y'));
  if (x == undefined || y == undefined) {
    return;
  }
  if (x == one.position[0] && y == one.position[1]) {
    return;
  }
  const text = event.target.innerHTML;
  if (one.content && text == one.content) {
    const flag = disAppear(map, one.position, [x, y]);
    if (flag) {
      map[one.position[1]][one.position[0]] = 0;
      map[y][x] = 0;
      event.target.innerHTML = '';
      one.dom.innerHTML = '';
      if (!jiance(map, contents)) {
        console.log('没有可以消除的了');
      }
    }
    one = {
      content: '',
      position: [],
      dom: null,
    };
  } else {
    one = {
      dom: event.target,
      content: text,
      position: [x, y],
    };
  }
})

container.appendChild(data.dom_fragment);
/**
 * @description 检测是否还有可以消除的物体
 * @param {*} map 
 */
function jiance(map, contents) {
  console.time();
  const t = map.some((arr, index) => arr.some((item, item_index) => {
    if (!item) {
      return false;
    }
    return map.some((arr, target_index) => arr.some((item, target_item_index) => {
      if (target_index === index && target_item_index === item_index) {
        return false;
      }
      if (!item) {
        return false;
      }
      if (contents[index][item_index] === contents[target_index][target_item_index]) {
        console.log([item_index, index], [target_item_index, target_index])
        if (disAppear(map, [item_index, index], [target_item_index, target_index])) {
          console.log([item_index, index], [target_item_index, target_index])
          return true;
        }
      }
      return false;
    }))
  }));
  console.timeEnd();
  return t;
}

/**
 * @description 
 *  连连看算法 粗滤版本
 *  三种情况：
 *  1. 直连
 *  2. 一个转弯（矩形)
 *  3. 两个转弯（从出发点的位置出发，向上下左右发射，于目标点形成矩形，变成一个转弯的情况）
 * 
 * @param {*} map 二维数组
 * @param {*} client 起始点坐标
 * @param {*} target 目标点坐标
 */
function disAppear(map, client, target) {
  if (client[0] === target[0] && client[1] === target[1]) {
    return false;
  }
  // 直连
  if (client[0] === target[0] && zhilian(map, client, target, 'y', true)) {
    return true;
  }
  if (client[1] === target[1] && zhilian(map, client, target, 'x', true)) {
    return true;
  }
  if (client[0] !== target[0] && client[1] !== target[1]) {
    if (yigewan(map, client, target)) {
      return true;
    }
  }
  // 两个弯

  const flag = Object.keys(direction_map).some((key) => {
    const operation = direction_map[key];
    const tmp_client = [...client];
    tmp_client[0] += operation[0];
    tmp_client[1] += operation[1];
    while (
        tmp_client[0] >= 0 && tmp_client[1] >= 0
        && tmp_client[0] < map[0].length && tmp_client[1] < map.length
        && !map[tmp_client[1]][tmp_client[0]]
    ) {
      if (yigewan(map, tmp_client, target)) {
        return true;
      }
      tmp_client[0] += operation[0];
      tmp_client[1] += operation[1];
    }
  });
  return flag;
}

/**
 * 
 * @param {*} map 二维数组
 * @param {*} tmp_client 起始点坐标
 * @param {*} target 目标点坐标
 * @param {'x'|'y'} direction
 * @param {boolean} true_target
 */
function zhilian(map, tmp_client, target, direction, true_target = false) {
  const client = [...tmp_client]
  // 需要判断x相等还是y相等
  let operation = [];
  if (direction === 'x') {
    operation = client[0] > target[0] ? direction_map['left'] : direction_map['right'];
  } else {
    operation = client[1] > target[1] ? direction_map['top'] : direction_map['bottom'];
  }
  client[0] += operation[0];
  client[1] += operation[1];
  while (client[0] !== target[0] || client[1] !== target[1]) {
    if (map[client[1]][client[0]]) {
      return false;
    }
    client[0] += operation[0];
    client[1] += operation[1];
  }
  // 判断相邻的两个点
  if (client[0] === target[0] && client[1] === target[1]) {
    if (true_target) {
      return true;
    } else if (map[client[1]][client[0]]) {
      return false;
    }
  }
  return true;
}

function yigewan(map, client, target) {
  const client_x = client[0];
  const client_y = client[1];
  const target_x = target[0];
  const target_y = target[1];
  if (zhilian(map, client, [client_x, target_y], 'y') && zhilian(map, [client_x, target_y], target, 'x', true)) {
    return true;
  }
  if (zhilian(map, client, [target_x, client_y], 'x') && zhilian(map, [target_x, client_y], target, 'y', true)) {
    return true;
  }
  return false;
}