import _ from 'lodash'

var tsTypeMap = {
  'uint64': {
    'type': 'number',
    'zero': 0,
  },
  'int64': {
    'type': 'number',
    'zero': 0,
  },
  'int': {
    'type': 'number',
    'zero': 0,
  },
  'uint': {
    'type': 'number',
    'zero': 0,
  },
  'string': {
    'type': 'string',
    'zero': "''",
  },
  'bool': {
    'type': 'boolean',
    'zero': false,
  },
}

export default [
  {
    name: 'tsEntityProp',
    func: function(p) {
      if (p.d) {
        if (p.d.type === 'id') {
          return 'string'
        } else if (p.d.type === 'enum') {
          return _.upperFirst(_.camelCase(p.d.n)) + 'Enum'
        }
      } else {
        return tsTypeMap[p.t].type
      }
    },
  },
  {
    name: 'tsPropZero',
    func: function(p) {
      if (p.d) {
        if (p.d.type === 'id') {
          return 'EntityIdUtil.createEntityId(EntityIdUtil.newCreateEntityIdPart())'
        } else if (p.d.type === 'enum') {
          return 'null'
        }
      } else {
        return tsTypeMap[p.t].zero
      }
    },
  },
  {
    name: 'tsPropFromJson',
    func: function(p) {
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
    name: 'goPropToJson',
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
