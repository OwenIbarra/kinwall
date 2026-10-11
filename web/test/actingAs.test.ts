// node --test test/ (npm test). Who acts on a wall screen while someone is picked.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { actingMember, pickAfterIdle } from '../src/actingAs.ts'

const family = [{ id: 'alex', grownUp: true }, { id: 'maya', grownUp: false }, { id: 'leo', grownUp: false }]

test('actingMember: the picked person when they may, else ask', () => {
  assert.equal(actingMember('maya', family)?.id, 'maya')
  assert.equal(actingMember('alex', family, m => !m.grownUp), null) // a grown-up can't suggest a kid's chore
  assert.equal(actingMember('maya', family, m => m.id === 'leo'), null) // Leo's chore isn't Maya's
  assert.equal(actingMember(null, family), null)
  assert.equal(actingMember(undefined, family), null)
  assert.equal(actingMember('gone', family), null) // removed since
})

test('pickAfterIdle: walls forget the pick, other devices keep it', () => {
  assert.equal(pickAfterIdle(true, 'maya'), null)
  assert.equal(pickAfterIdle(false, 'maya'), 'maya')
  assert.equal(pickAfterIdle(true, null), null)
})
