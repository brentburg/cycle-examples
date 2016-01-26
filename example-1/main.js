import {run} from '@cycle/core'
import {button, makeDOMDriver} from '@cycle/dom'

function main ({DOM}) {
  return {
    DOM: DOM
      .select('.counter')
      .events('click')
      .map(() => 1)
      .scan((x, y) => x + y, 0)
      .startWith(0)
      .map(count =>
        button('.counter', 'Click Count: ' + count)
      )
  }
}

run(main, {DOM: makeDOMDriver('#app')})
