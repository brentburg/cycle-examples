import {button, div, span} from '@cycle/dom'
import {Observable} from 'rx'

function intent ({DOM}) {
  return {
    increment$: DOM.select('.inc').events('click').map(() => +1),
    decrement$: DOM.select('.dec').events('click').map(() => -1),
    remove$: DOM.select('.remove').events('click')
  }
}

function model (actions) {
  return Observable.just(0)
    .merge(actions.increment$)
    .merge(actions.decrement$)
    .scan((x, y) => x + y)
    .shareReplay(1)
}

function view (model$) {
  return model$.map(model =>
    div('.counter', [
      button('.dec', '-'),
      span('.value', model.toString()),
      button('.inc', '+'),
      button('.remove', 'Remove')
    ])
  )
}

export default function CounterButton (sources) {
  const actions = intent(sources)
  return {DOM: view(model(actions)), actions}
}
