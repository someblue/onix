'use strict';

var mongoose = require('mongoose'),
    Template = mongoose.model('Template');

exports.listAll = function(req, res) {
    Template.find({}, function(err, template) {
        if (err) res.send(err);
        res.json(template);
    });
};

exports.createOne = function(req, res) {
    var newTemplate = new Template(req.body);
    newTemplate.save(function(err, template) {
        if (err) res.send(err);
        res.json(template);
    });
};

exports.updateOne = function(req, res) {
    Template.findOneAndUpdate(
        {_id: req.params.id}, req.body, {new: true},
        function(err, template) {
            if (err) res.send(err);
            res.json(template);
        }
    );
};

exports.deleteOne = function(req, res) {
    Template.remove({
        _id: req.params.id,
    }, function(err, template) {
        if (err) res.send(err);
        res.json(template);
    });
};

