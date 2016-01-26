import {run} from '@cycle/core'
import {makeDOMDriver} from '@cycle/dom'
import Counter from './counter'

run(Counter, {DOM: makeDOMDriver('#app')})
