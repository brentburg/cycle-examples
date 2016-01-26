import {run} from '@cycle/core'
import {div, makeDOMDriver} from '@cycle/dom'
import {Observable} from 'rx'

function main () {
  return {
    DOM: Observable.just(
      div('Hello, Pandamonium!')
    )
  }
}

run(main, {DOM: makeDOMDriver('#app')})
