if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    'mongoose',
    'api/user/UserAssociationsAPI'
], function (mongoose, UserAssociationsAPI) {

    var exports = {},
        User    = mongoose.model('User');

    exports.getAll = function (req, res) {
        var userId;
        UserAssociationsAPI.getAll(userId, function (err, data) {
            if (!err) res.send({ response: data });
            else res.send({ errors: err });
        });
    };

});