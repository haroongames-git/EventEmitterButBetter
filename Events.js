const OldEE = require('events').EventEmitter
let err
let forbiddenEmitEvents

class EventEmitter extends OldEE {
  constructor(forbidden, ...options) {
    super(options)
    forbiddenEmitEvents = forbidden || []
  }
  emit(name, ...args) {
    const arr = []
    if (forbiddenEmitEvents.includes(name)) {
      err = new Error(`Event '${name}' has been forbidden from being emitted. Change this by setting the forbidden parameter in the constructor.`)
      throw err;
    }
    this.listeners(name).forEach(function (func) {
      func(args)
    })
  }
  // returns true if success, if already forbidden returns false
  forbidEvent(name) {
    if (forbiddenEmitEvents.includes(name)) return false
    forbiddenEmitEvents.push(name)
    return true
  }
  // returns true if success, if not forbidden returns false
  unForbidEvent(name) {
    if (!forbiddenEmitEvents.includes(name)) return false
    forbiddenEmitEvents.splice(forbiddenEmitEvents.findIndex((element) => element == name))
    return true
  }
}

module.exports = EventEmitter