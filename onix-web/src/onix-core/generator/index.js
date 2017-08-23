import template from 'art-template'
import pipes from './pipes'
import logger from './logger'

function init() {
  logger.log('running onix generator init...')
  template.defaults.escape = false
  template.defaults.minimize = true
  if (pipes && pipes instanceof Array) {
    pipes.forEach(pipe => {
      logger.log('pipe import: ', pipe.name)
      template.defaults.imports[pipe.name] = pipe.func
    })
  }
}

init()

export default function(tmpl, data) {
  return template.render(tmpl, data)
}
