import {button, div} from '@cycle/dom'
import Counter from './counter'
import {Observable} from 'rx'
import isolate from '@cycle/isolate'
import {hotVTree} from '../util'

function intent ({DOM}) {
  return {
    add$: DOM
      .select('.add')
      .events('click')
      .map(() => hotVTree(isolate(Counter)({DOM})))
  }
}

function model (actions) {
  const addMod$ = actions.add$.map(counter => model => model.concat(counter))
  return Observable.just([])
    .merge(addMod$)
    .scan((acc, modFn) => modFn(acc))
    .shareReplay(1)
}

function view (model$) {
  return model$.map(counters =>
    div([
      button('.add', 'Add Counter'),
      div(counters.map(c => c.DOM))
    ])
  )
}

export default function CounterList (sources) {
  return {DOM: view(model(intent(sources)))}
}
