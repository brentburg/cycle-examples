import {button, div, input, span} from '@cycle/dom'
import {Observable} from 'rx'

function intent ({DOM}) {
  return {
    increment$: DOM.select('.inc').events('click').map(() => +1),
    decrement$: DOM.select('.dec').events('click').map(() => -1),
    updateName$: DOM.select('.edit-name').events('input').map(ev => ev.target.value),
    startEdit$: DOM.select('.name').events('click').map(() => true),
    endEdit$: DOM.select('.edit-name').events('blur').map(() => false),
    remove$: DOM.select('.remove').events('click')
  }
}

function model (actions) {
  const valueMod$ = actions.increment$
    .merge(actions.decrement$)
    .map(change => model =>
      Object.assign({}, model, {value: (model.value + change)})
    )
  const nameMod$ = actions.updateName$
    .map(name => model => Object.assign({}, model, {name}))
  const editingMod$ = actions.startEdit$
    .merge(actions.endEdit$)
    .map(editing => model => Object.assign({}, model, {editing}))
  return Observable.just({name: '', value: 0, editing: false})
    .merge(valueMod$)
    .merge(nameMod$)
    .merge(editingMod$)
    .scan((acc, mod) => mod(acc))
    .shareReplay(1)
}

function view (model$) {
  return model$.map(model =>
    div('.counter', [
      button('.dec', '-'),
      span('.value', model.value.toString()),
      button('.inc', '+'),
      button('.remove', 'Remove'),
      model.editing
        ? input('.edit-name', {type: 'text', value: model.name})
        : span('.name', model.name || 'name me')
    ])
  )
}

export default function CounterButton (sources) {
  const actions = intent(sources)
  return {DOM: view(model(actions)), actions}
}
