import test from 'ava';
require('../object');

test('isExitKey', (t) => {
  const o = {a: 1, b: {c: 1}, c: {c: 2}}
  t.is(o.isExitKey('a'), true)
  t.is(o.isExitKey('c.c'), true)
  t.is(o.isExitKey('a.b.d'), false)
  t.throws(() => o.isExitKey(''));
  t.throws(() => o.isExitKey());
  t.throws(() => o.isExitKey('.a'));
  t.throws(() => o.isExitKey('a..a'));
});

test('getValue', (t) => {
  const o = {a: 1, b: {c: 1}, c: {c: 2}}
  t.is(o.getValue('a'), 1)
  t.is(o.getValue('c.c'), 2)
  t.is(o.getValue('a.b.d'), null)
  t.throws(() => o.getValue(''));
  t.throws(() => o.getValue());
  t.throws(() => o.getValue('.a'));
  t.throws(() => o.getValue('a..a'));
});