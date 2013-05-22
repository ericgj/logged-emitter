var Emitter = require('emitter')
  , Spy     = require('minispy')

module.exports = LoggedEmitter;

function LoggedEmitter(obj){
  var emitter = Emitter(obj);
  emitter.on = on.bind(emitter);
  emitter.emittedEvents = emittedEvents.bind(emitter);
  return emitter;
}

function on(event,fn){
  var spy = Spy(fn)
    , target = (fn.caller ? fn.caller.constructor.name : null)
  this._spies = this._spies || [];
  this._spies.push({ event: event, target: target, spy: spy});
  return this.on(event,spy.watch);
};

/** Return array of `[event, target, spy]`
 *  in the order callbacks defined.
 *  
 *  Filtered by event, if passed
 */
function emittedEvents(event){
  if (!this._spies) return [];
  if (event) {
    var ret = [];
    for (var e in this._spies){
      if (e.event == event) ret.push(e);
    }
    return ret;
  } else {
    return this._spies;
  }
};


