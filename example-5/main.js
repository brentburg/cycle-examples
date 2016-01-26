import {run} from '@cycle/core'
import {makeDOMDriver} from '@cycle/dom'
import CounterList from './counter-list'

run(CounterList, {DOM: makeDOMDriver('#app')})
