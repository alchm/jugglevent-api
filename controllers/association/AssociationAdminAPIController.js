if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    'mongoose',
    'api/association/AssociationAdminAPI'
], function (mongoose, AssociationAdminAPI) {

    var exports = {},
        User    = mongoose.model('User');

    exports.getById = function (req, res) {
        var userId,
            aId;
        AssociationAdminAPI.getById(aId, userId, function (err, data) {
            if (!err) res.send({ response: data });
            else res.send({ errors: err });
        });
    };

    exports.addById = function (req, res) {
        var userId, aId;
        AssociationAdminAPI.addById(aId, userId, function (err, data) {
            if (!err) res.send({ response: data });
            else res.send({ errors: err });
        });
    }

    exports.removeById = function (req, res) {
        var userId, aId;
        AssociationAdminAPI.removeById(aId, userId, function (err, data) {
            if (!err) res.send({ response: data });
            else res.send({ errors: err });
        });
    }

    return exports;

});