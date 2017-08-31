import store from 'store'
import Rx from 'rx'

var schemasSubject = new Rx.Subject()

var model = {
  schemas: [],
  schemas$: schemasSubject.asObservable(),
  setSchemas: function(schemas) {
    this.schemas = schemas
    schemasSubject.onNext(this.schemas)
  },
  addSchema: function(schemaName, content) {
    this.schemas.push({ name: schemaName, content: content })
    schemasSubject.onNext(this.schemas)
  },
  updateSchema: function(schemaName, content) {
    var idx = this.schemas.findIndex(e => e.name === schemaName)
    if (idx >= 0) {
      this.schemas[idx].content = content
      schemasSubject.onNext(this.schemas)
      return true
    }
    return false
  },
  setSchema: function(schemaName, content) {
    var isUpdated = this.updateSchema(schemaName, content)
    if (!isUpdated) {
      this.addSchema(schemaName, content)
    }
  },
  getSchema: function(schemaName) {
    var idx = this.schemas.findIndex(e => e.name === schemaName)
    return idx >= 0 ? this.schemas[idx].content : ''
  },
  removeSchema: function(schemaName) {
    var idx = this.schemas.findIndex(e => e.name === schemaName)
    if (idx >= 0) {
      var rmSchema = this.schemas.splice(idx, 1)
      schemasSubject.onNext(this.schemas)
      return rmSchema
    }
    return null
  },
  exist: function(schemaName) {
    return this.schemas.findIndex(e => e.name === schemaName) >= 0
  },
}

function init() {
  const key = 'model/schemas'
  model.schemas = store.get(key) || []
  model.schemas$.subscribe(val => store.set(key, val))
}
init()

export default model
