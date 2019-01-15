import _ from 'lodash'

var tsTypeMap = {
    'uint64': {
        't': 'number',
        'zero': 0,
    },
    'int64': {
        't': 'number',
        'zero': 0,
    },
    'int': {
        't': 'number',
        'zero': 0,
    },
    'uint': {
        't': 'number',
        'zero': 0,
    },
    'string': {
        't': 'string',
        'zero': "''",
    },
    'bool': {
        't': 'boolean',
        'zero': false,
    },
}

// Force upper first. If want no upper first, just use _.camelCase
var camel = function(str) {
    return _.upperFirst(_.camelCase(str))
}

export default [
    {
        name: 'tsEntityProp',
        func: function(p) {
            if (p.d) {
                if (p.d.t === 'id') {
                    return 'string'
                } else if (p.d.t === 'enum') {
                    return camel(p.d.n) + 'Enum'
                } else if (p.d.t === 'array') {
                    return tsTypeMap[p.d.item].t + '[]'
                } else if (p.d.t === 'obj') {
                    return camel(p.d.n)
                }
            } else {
                return tsTypeMap[p.t].t
            }
        },
    },
    {
        name: 'tsPropZero',
        func: function(p) {
            if (p.d) {
                if (p.d.t === 'id') {
                    return 'EntityIdUtil.createEntityId(EntityIdUtil.newCreateEntityIdPart())'
                } else if (p.d.t === 'enum') {
                    return 'null'
                } else if (p.d.t === 'array') {
                    return '[]'
                } else if (p.d.t === 'obj') {
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
            var res = `jsonObject.${p.n}`
            if (p.d && p.d.t === 'obj') {
                res = `${camel(p.d.n)}.fromJson(${res})`
            }
            return res
        },
    },
    {
        name: 'tsPropToJson',
        func: function(p) {
            var camelName = _.camelCase(p.n)
            var res = `entity.${camelName}`
            if (p.d && p.d.t === 'obj') {
                res = `${camel(p.d.n)}.toJson(${res})`
            }
            return res
        },
    },
]
