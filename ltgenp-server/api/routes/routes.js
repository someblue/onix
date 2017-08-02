'use strict';

module.exports = function(app) {
    console.log('registing routes');
    var template = require('../controllers/template');

    app.route('/template')
        .get(template.listAll)
        .post(template.createOne);

    app.route('/template/:id')
        .put(template.updateOne)
        .delete(template.deleteOne);
};

