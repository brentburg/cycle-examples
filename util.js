export function hotDOM (sinks) {
  if (!sinks.DOM) {
    return sinks
  }
  const DOM = sinks.DOM.replay(null, 1)
  DOM.connect()
  return Object.assign({}, sinks, {DOM})
}
