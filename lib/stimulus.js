'use strict';

const { parse, stringify } = require('circular-json')

class Stimulus extends Array {

  static fromKSON(kson) {
    let [ label, obj ] = kson.split(/\s+(.+)/)
    if (!label || !obj) throw new Error('invalid KSON, must specify both topic and payload')
    let [ topic, origin ] = label.split('|')
    return new Stimulus(topic, origin).add(parse(obj))
  }

  constructor(topic, origin=null) {
    super()
    this.topic  = topic
    this.origin = origin
	this.tags = new Map
    if (origin) this.tags.set(origin)
  }

  add() {
    this.push(...arguments)
    return this
  }

  compress() {
    if (this.length > 1) {
      let uniques = [ ...new Set(this) ]
      if (this.length !== uniques.length) {
        this.splice(0, this.length, ...uniques)
      }
    }
    return this
  }

  tag(topic, val) { 
	topic && this.tags.set(topic, val) 
	return this
  }

  match(keys) {
    if (!arguments.length) return null
    if (arguments.length > 1) keys = arguments
    if (typeof keys === 'string') keys = [ keys ]
    //if (keys instanceof Set && keys.has(this.key)) return true
    let idx = -1
    for (let key of keys) {
      idx++
      if (this.key === key) return [ idx, key ]
      if (!key || key.indexOf('*') === -1) continue
      let regex = '^'+key.replace('*','.*')+'$'
      if (this.key.match(regex) != null)
        return [ idx, key ]
    }
    return null
  }

  toKSON(f=x=>x) {
    let { topic, origin, data } = this
    let label = origin ? `${topic}|${origin}` : topic
    if (!f || !data) return null
    const values = []
    for (let value of this) {
      value = stringify(f(value))
      value && values.push(label+' '+value)
    }
    if (!values.length) return null
    return values.join("\n")
  }

  get key()   { return this.topic }
  get value() { return this[this.length - 1] }
  get data()  { return this.value }
  get accepted() {
    for (let x of this.tags.values()) {
      if (x) return true
    }
    return false
  }
}

module.exports = Stimulus