
let rows = {}

export default function(props = [], state = []) {
  return function(target) {
    const proto = Object.create(target.prototype)

    proto.shouldComponentUpdate = function(newProps, newState) {
      let id = (this._update_id = this._update_id || Math.random())

      for (var i = 0; i < props.length; i++) {
        const name = props[i]
        const oldVal = this.props[name]
        const newVal = newProps[name]
        if (newVal !== oldVal) {
          if (localStorage.traceUpdates == '*') {
            const rowName = `${target.name} prop '${name}'`
            rows[rowName] = rows[rowName] || { renders: 0, instances: {} }
            rows[rowName].renders++
            rows[rowName].instances[id] = rows[rowName].instances[id] || 0
            rows[rowName].instances[id]++
          }
          return true
        }
      }

      for (var i = 0; i < state.length; i++) {
        const name = state[i]
        const oldVal = this.state[name]
        const newVal = newState[name]
        if (newVal !== oldVal) {
          if (localStorage.traceUpdates == '*') {
            const rowName = `${target.name} state '${name}'`
            rows[rowName] = rows[rowName] || { renders: 0, instances: {} }
            rows[rowName].renders++
            rows[rowName].instances[id] = rows[rowName].instances[id] || 0
            rows[rowName].instances[id]++
          }
          return true
        }
      }

      return false
    }

    target.prototype = proto
  }
}

function enable() {
  console.log('enabled update tracing')
  localStorage.traceUpdates = '*'
}

function disable() {
  console.log('disabled update tracing')
  localStorage.traceUpdates = ''
}

function print() {
  if (Object.keys(rows).length == 0) {
    console.log('nothing to print')
    return
  }

  for (var k in rows) {
    rows[k].instances = Object.keys(rows[k].instances).length
    rows[k]['renders per instance'] = rows[k].renders / rows[k].instances
  }

  console.table(rows, ['renders', 'instances', 'renders per instance'])
  rows = {}
}

window.updates = {
  enable,
  disable,
  print
}
