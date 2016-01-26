import {button, div} from '@cycle/dom'
import Counter from './counter'
import {Observable, Subject} from 'rx'
import isolate from '@cycle/isolate'
import {hotDOM} from '../util'

function intent ({DOM}) {
  const remove$ = new Subject()
  return {
    add$: DOM
      .select('.add')
      .events('click')
      .map(() => {
        const counter = hotDOM(isolate(Counter)({DOM}))
        counter.actions.remove$
          .map(() => counter)
          .subscribe(remove$.asObserver())
        return counter
      }),
    remove$: remove$.throttle(100)
  }
}

function model (actions) {
  const addMod$ = actions.add$.map(counter => model => model.concat(counter))
  const removeMod$ = actions.remove$
    .map(delCounter => model => model.filter(counter => {
      return counter !== delCounter
    }))
  return Observable.just([])
    .merge(addMod$)
    .merge(removeMod$)
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
