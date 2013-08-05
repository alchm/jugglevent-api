if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    'mongoose',
    'api/user/UserAssociationAPI'
], function (mongoose, UserAssociationAPI) {

    var exports = {},
        User    = mongoose.model('User');

    exports.getById = function (req, res) {
        var userId, aId;
        UserAssociationAPI.getById(userId, aId, function (err, data) {
            if (!err) res.send({ response: data });
            else res.send({ errors: err });
        });
    };

    exports.addById = function (req, res) {
        var userId, aId;
        UserAssociationAPI.addById(userId, aId, function (err, data) {
            if (!err) res.send({ response: data });
            else res.send({ errors: err });
        });
    }

    exports.removeById = function (req, res) {
        var userId, aId;
        UserAssociationAPI.removeById(userId, aId, function (err, data) {
            if (!err) res.send({ response: data });
            else res.send({ errors: err });
        });
    }

    return exports;

});