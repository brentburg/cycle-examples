import {run} from '@cycle/core'
import {makeDOMDriver} from '@cycle/dom'
import CounterButton from './counter-button'

run(CounterButton, {DOM: makeDOMDriver('#app')})
