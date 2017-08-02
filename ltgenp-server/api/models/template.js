'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemplateSchema = new Schema({
    name: {
        type: String,
        Required: 'require name'
    },
    createdTime: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Template', TemplateSchema);

