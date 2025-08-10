import test from 'node:test';
import assert from 'node:assert/strict';
import { rollDropTable } from './rewards.js';

test('rollDropTable returns empty when total weight is zero', () => {
  const result = rollDropTable([
    { itemId: 'a', weight: 0, qtyMin: 1, qtyMax: 1 },
    { itemId: 'b', weight: 0, qtyMin: 1, qtyMax: 1 }
  ]);
  assert.deepEqual(result, {});
});
