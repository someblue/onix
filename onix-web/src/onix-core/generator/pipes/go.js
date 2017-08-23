import _ from 'lodash'

export default [
  {
    name: 'goEntityProp',
    func: function(p) {
      if (p.d) {
        if (p.d.type === 'id') {
          return 'string'
        }
      }
      return p.t
    },
  },
  {
    name: 'goPropDatalize',
    func: function(p) {
      var name = _.upperFirst(_.camelCase(p.n))
      var funcName, args
      if (p.d) {
        funcName = 'EntityIdPtrValue'
        args = [
          `src.${name}`,
        ]
      } else {
        funcName = `${_.upperFirst(p.t)}PtrValue`
        args = [
          `src.${name}`,
        ]
      }
      return `out.Set${name}(util.${funcName}(${args.join(', ')}))`
    },
  },
  {
    name: 'goPropEntitilize',
    func: function(p) {
      var name = _.upperFirst(_.camelCase(p.n))
      var funcName, args
      if (p.d) {
        funcName = 'EntityIdPtr'
        args = [
          `src.${name}()`,
        ]
      } else {
        funcName = `${_.upperFirst(p.t)}Ptr`
        args = [
          `src.${name}()`,
        ]
      }
      return `out.${name} = util.${funcName}(${args.join(',')})`
    },
  },
]
