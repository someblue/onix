import store from 'store'
import Rx from 'rx'

var templatesSubject = new Rx.Subject()

var model = {
  templates: [],
  templates$: templatesSubject.asObservable(),
  setTemplates: function(tmpls) {
    this.templates = tmpls
    templatesSubject.onNext(this.templates)
  },
  addTemplate: function(tmplName, content) {
    this.templates.push({ name: tmplName, content: content })
    templatesSubject.onNext(this.templates)
  },
  updateTemplate: function(tmplName, content) {
    var idx = this.templates.findIndex(e => e.name === tmplName)
    if (idx >= 0) {
      this.templates[idx].content = content
      templatesSubject.onNext(this.templates)
      return true
    }
    return false
  },
  setTemplate: function(tmplName, content) {
    var isUpdated = this.updateTemplate(tmplName, content)
    if (!isUpdated) {
      this.addTemplate(tmplName, content)
    }
  },
  removeTemplate: function(tmplName) {
    var idx = this.templates.findIndex(e => e.name === tmplName)
    if (idx >= 0) {
      var rmTmpl = this.templates.splice(idx, 1)
      templatesSubject.onNext(this.templates)
      return rmTmpl
    }
    return null
  },
  exist: function(tmplName) {
    return this.templates.findIndex(e => e.name === tmplName) >= 0
  },
}

function init() {
  const key = 'model/templates'
  model.templates = store.get(key) || []
  model.templates$.subscribe(val => store.set(key, val))
}
init()

export default model
