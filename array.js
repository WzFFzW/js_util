Array.prototype.flat2 = function() {
  return this.reduce((accumulator, item) => {
    if (!Array.isArray(item)) {
      return [...accumulator, item];
    }
    return [...accumulator, ...item.flat2()];
  }, []);
};