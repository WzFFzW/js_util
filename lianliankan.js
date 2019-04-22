function creatMap(depth) {
  const mapDepth = depth + 2;
  const map = [];
  for (let i = 0; i < mapDepth; i++) {
    const arr = new Array(mapDepth).fill(1);
    if (i === 0 || i === mapDepth - 1) {
      for (let j = 1; j < arr.length - 1; j++) {
        arr[j] = 0;
      }
    } else {
      arr[0] = 0;
      arr[arr.length - 1] = 0;
    }
    map.push(arr);
  }
  return map
}

const map = [
  [1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1],
];
const direction_map = {
  left: [-1, 0],
  right: [1, 0],
  top: [0, -1],
  bottom: [0, 1],
};

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
    return yigewan(map, client, target);
  }
  // 两个弯

  const flag = Object.keys(direction_map).some((key) => {
    const operation = direction_map[key];
    const tmp_client = [...client];
    tmp_client[0] += operation[0];
    tmp_client[1] += operation[1];
    let limit = 0;
    while (
      limit < 10 &&
        Math.max(tmp_client[0], 0) && Math.max(tmp_client[1], 0)
        && tmp_client[0] < map.length && tmp_client[1] < map.length
        && !map[tmp_client[0]][tmp_client[1]]
    ) {
      if (yigewan(map, tmp_client, target)) {
        return true;
      }
      tmp_client[0] += operation[0];
      tmp_client[1] += operation[1];
      limit++;
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
    if (map[client[0]][client[1]]) {
      return false;
    }
    client[0] += operation[0];
    client[1] += operation[1];
  }
  // 判断相邻的两个点
  if (client[0] === target[0] && client[1] === target[1]) {
    if (true_target) {
      return true;
    } else if (map[client[0]][client[1]]) {
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
  // zhilian(client, [client_x, target_y]);
  // zhilian([client_x, target_y], target);
  if (zhilian(map, client, [target_x, client_y], 'x') && zhilian(map, [target_x, client_y], target, 'y', true)) {
    return true;
  }
  return false;
}

// console.log(disAppear(map, [1, 1], [2, 3]))
// console.log(disAppear(map, [2, 2], [2, 3]))
// console.log(disAppear(map, [2, 2], [1, 2]))
// console.log(disAppear(map, [1, 1], [3, 3]))
// console.log(disAppear(map, [2, 1], [2, 3]))
// console.log(disAppear(map, [2, 2], [1, 3]))
console.log(disAppear(map, [3, 3], [1, 3]))
console.table(map)