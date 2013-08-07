if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

//////////
// Routes
//////////

define([
    'Router',
    'Middlewares',
    '../controllers/UserAPIController',
    '../controllers/user/UserAssociationAPIController',
    '../controllers/user/UserAssociationsAPIController',
    '../controllers/AssociationAPIController'
], function (Router, Middlewares, UserAC, UserAssociationAC, UserAssociationsAC, AssociationAC) {

    var exports = {},
        Routes  = Router.getRoutes();

    exports.init = function (app) {

        // UserAC
        app.get(    Routes._USER__ID,
                    UserAC.getUserById   );

        app.post(   Routes._USER,
                    UserAC.createUser    );

        app.put(    Routes._USER__ID,
                    UserAC.updateById    );

        app.delete( Routes._USER__ID,
                    UserAC.deleteById    );

        // UserAssociationsAC
        app.get(    Routes._USER_ASSOCIATIONS,
                    UserAssociationsAC.getAll   );

        // UserAssociationAC
        app.get(    Routes._USER_ASSOCIATION,
                    UserAssociationAC.getById       );

        app.put(    Routes._USER_ASSOCIATION,
                    UserAssociationAC.addById       );

        app.delete( Routes._USER_ASSOCIATION,
                    UserAssociationAC.removeById    );

        // AssociationAC
        app.get(    Routes._ASSOCIATION__ID,
                    AssociationAC.getById       );

        app.post(   Routes._ASSOCIATION,
                    AssociationAC.new           );

        app.put(    Routes._ASSOCIATION__ID,
                    AssociationAC.updateById   );

        app.delete( Routes._ASSOCIATION__ID,
                    AssociationAC.deleteById    );

    }

    return exports;

});