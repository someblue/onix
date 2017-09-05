import _ from 'lodash'

export default [
    {
        name: 'camelCase',
        func: function(str, upperFirst) { return upperFirst ? _.upperFirst(_.camelCase(str)) : _.camelCase(str) },
    },
    {
        name: 'kebabCase',
        func: function(str) { return _.kebabCase(str) },
    },
    {
        name: 'lowerCase',
        func: function(str) { return _.lowerCase(str) },
    },
    {
        name: 'snakeCase',
        func: function(str) { return _.snakeCase(str) },
    },
    {
        name: 'startCase',
        func: function(str) { return _.startCase(str) },
    },
    {
        name: 'upperCase',
        func: function(str) { return _.upperCase(str) },
    },
    {
        name: 'toUpper',
        func: function(str) { return _.toUpper(str) },
    },
]
