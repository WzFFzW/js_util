let moduleExports = {};

const r = require.context('./', true, /^\.\/.+\/.+\.js$/);
r.keys().forEach(key => {
    let attr = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
    moduleExports[attr] = r(key);
});

console.log(1111);

module.exports = moduleExports;