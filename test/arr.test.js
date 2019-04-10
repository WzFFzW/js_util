import test from 'ava';
require('../array');

test('array.flat2', t => {
	t.deepEqual([1, 2, 4, [1, 2, [2, 3]]].flat2(), [1, 2, 4, 1, 2, 2, 3]);
});