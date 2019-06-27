import test from 'ava';
const getValue = require('../src/object/getValue');
console.log(getValue);

// test('isExitKey', (t) => {
//   const o = {a: 1, b: {c: 1}, c: {c: 2}}
//   t.is(o.isExitKey('a'), true)
//   t.is(o.isExitKey('c.c'), true)
//   t.is(o.isExitKey('a.b.d'), false)
//   t.throws(() => o.isExitKey(''));
//   t.throws(() => o.isExitKey());
//   t.throws(() => o.isExitKey('.a'));
//   t.throws(() => o.isExitKey('a..a'));
// });

test('getValue', (t) => {
  const o = {a: 1, b: {c: 1}, c: {c: 2}}
  t.is(getValue(o, 'a'), 1)
  t.is(getValue(o, 'c.c'), 2)
  t.is(getValue(o, 'a.b.d'), null)
  t.throws(() => getValue(o, ''));
  t.throws(() => getValue(o));
  t.throws(() => getValue(o, '.a'));
  t.throws(() => getValue(o, 'a..a'));
});