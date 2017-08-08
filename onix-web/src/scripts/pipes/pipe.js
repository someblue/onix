var pipes = [
    {
        name: 'camelCase',
        func: function (str, upperFirst) { return upperFirst ? _.upperFirst(_.camelCase(str)) : _.camelCase(str); }
    },
    {
        name: 'kebabCase',
        func: function (str) { return _.kebabCase(str); }
    },
    {
        name: 'lowerCase',
        func: function (str) { return _.lowerCase(str); }
    },
    {
        name: 'snakeCase',
        func: function (str) { return _.snakeCase(str); }
    },
    {
        name: 'startCase',
        func: function (str) { return _.startCase(str); }
    },
    {
        name: 'upperCase',
        func: function (str) { return _.upperCase(str); }
    },
    ...goPipes,
    ...tsPipes,
];

// register pipes
pipes.forEach(pipe => {
    template.defaults.imports[pipe.name] = pipe.func;
});