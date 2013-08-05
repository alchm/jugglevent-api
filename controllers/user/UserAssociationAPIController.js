if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    'mongoose',
    'api/user/UserAssociationAPI'
], function (mongoose, UserAssociationAPI) {

    var exports = {},
        User    = mongoose.model('User');

    exports.getAll = function (req, res) {
        var userId;
        UserAssociationAPI.getAll(userId, function (err, data) {
            if (!err) res.send({ response: data });
            else res.send({ errors: err });
        });
    };

});