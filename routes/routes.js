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
        app.get(    Routes._USER,
                    UserAC.getUserById   );

        app.post(   Routes._USER,
                    UserAC.createUser    );

        app.put(    Routes._USER,
                    UserAC.updateById    );

        app.delete( Routes._USER,
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

    }

    return exports;

});