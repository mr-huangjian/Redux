/**
 * 自己实现一个Redux
 */

const EventEmitter = require('events').EventEmitter

class CreateStore {
  constructor(reducer) {
    this._state = reducer()
    this._reducer = reducer
    this._emitter = new EventEmitter
  }

  getState(){
    return this._state
  }

  dispatch(action){
    if (this._reducer) {
        this._state = this._reducer(this._state, action)
    }
    this._emitter.emit('change')
  }

  subscribe(fn){
    this._emitter.on('change', fn)
  }
}

function reducer(state = {number: 10}, action = {}) {
  switch (action.type) {
    case 'add':
      return Object.assign({}, state, {
        number: state.number + 1
      })
    case 'sub':
      return Object.assign({}, state, {
        number: state.number - 1
      })
    default:
      return state
  }
}

const store = new CreateStore(reducer)

store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch({
  type: 'add'
})
