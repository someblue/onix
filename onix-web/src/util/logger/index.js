export default function(name) {
  return {
    name: name,
    enable: true,
    log: function(...args) {
      if (this.enable) {
        if (!(args instanceof Array)) {
          args = [args]
        }
        args = [`[${name}] `].concat(args)
        console.log.apply(this, args)
      }
    }
  }
}
