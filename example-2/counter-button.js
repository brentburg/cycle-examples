import {button} from '@cycle/dom'

function intent ({DOM}) {
  return {
    increment$: DOM
      .select('.inc')
      .events('click')
      .map(() => 1)
  }
}

function model (actions) {
  return actions.increment$
    .scan((x, y) => x + y, 0)
    .startWith(0)
}

function view (model$) {
  return model$.map(model =>
    button('.inc', 'Click Count: ' + model)
  )
}

export default function CounterButton (sources) {
  return {DOM: view(model(intent(sources)))}
}
