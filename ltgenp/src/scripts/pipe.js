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
    {
        name: 'goEntityProp',
        func: function (p) {
            if (p.d) {
                if (p.d.type === 'id') {
                    return 'string';
                }
            }
            return p.t;
        }
    },
    {
        name: 'goPropDatalize',
        func: function (p) {
            var name = _.upperFirst(_.camelCase(p.n));
            var funcName, args;
            if (p.d) {
                funcName = 'EntityIdPtrValue';
                args = [
                    `src.${name}`,
                ];
            } else {
                funcName = `${_.upperFirst(p.t)}PtrValue`;
                args = [
                    `src.${name}`,
                ];
            }
            return `out.Set${name}(util.${funcName}(${args.join(', ')}))`;
        }
    },
    {
        name: 'goPropEntitilize',
        func: function (p) {
            var name = _.upperFirst(_.camelCase(p.n));
            var funcName, args;
            if (p.d) {
                funcName = 'EntityIdPtr';
                args = [
                    `src.${name}()`,
                ];
            } else {
                funcName = `${_.upperFirst(p.t)}Ptr`;
                args = [
                    `src.${name}()`,
                ];
            }
            return `out.${name} = util.${funcName}(${args.join(',')})`;
        }
    }
];

// register pipes
pipes.forEach(pipe => {
    template.defaults.imports[pipe.name] = pipe.func;
});