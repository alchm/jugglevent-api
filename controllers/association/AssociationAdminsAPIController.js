if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    'mongoose',
    'api/association/AssociationAdminsAPI'
], function (mongoose, AssociationAdminsAPI) {

    var exports = {},
        User    = mongoose.model('User');

    exports.getAll = function (req, res) {
        var aId;
        AssociationAdminsAPI.getAll(aId, function (err, data) {
            if (!err) res.send({ response: data });
            else res.send({ errors: err });
        });
    };

});