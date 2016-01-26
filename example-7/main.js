import {run} from '@cycle/core'
import {div, input, h1, label, makeDOMDriver} from '@cycle/dom'
import {Observable} from 'rx'

function main ({DOM, hash}) {
  const name$ = DOM
    .select('.name-field')
    .events('input')
    .map(ev => ev.target.value)
    .merge(hash)
  return {
    DOM: name$.startWith('').map(name =>
      div([
        label([
          'Enter your name:',
          input('.name-field', {type: 'text', value: name})
        ]),
        h1(`Hello, ${name}!`)
      ])
    ),
    hash: name$.debounce(500)
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  hash: (hashStream) => {
    hashStream.subscribe(val => window.location.hash = val)
    return Observable.fromEvent(window, 'hashchange')
      .map(hash => window.location.hash.substr(1))
      .startWith(window.location.hash.substr(1))
  }
})
