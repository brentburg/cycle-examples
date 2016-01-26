import CounterButton from './counter-button'
import {mockDOMSource} from '@cycle/dom'
import {Observable} from 'rx'
import test from 'tape'

test('CounterButton should increment number by 1 when clicked', t => {
  t.plan(4)
  const DOM = mockDOMSource({'.inc': {click: Observable.repeat({}, 3)}})
  const sinks = CounterButton({DOM})
  sinks.DOM
    .take(4)
    .toArray()
    .subscribe(vtrees => {
      const counts = vtrees.map(vt => vt.children[0].text.match(/\d+$/)[0])
      t.equal(counts[0], '0', 'button has count 0')
      t.equal(counts[1], '1', 'button has count 1')
      t.equal(counts[2], '2', 'button has count 2')
      t.equal(counts[3], '3', 'button has count 3')
    })
})
