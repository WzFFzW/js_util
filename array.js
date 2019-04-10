/* 
*  将多为数组进行降维，降至一维
*  return: 降维之后的数组
*/
Array.prototype.flat2 = function() {
  return this.reduce((accumulator, item) => {
    if (!Array.isArray(item)) {
      return [...accumulator, item];
    }
    return [...accumulator, ...item.flat2()];
  }, []);
};