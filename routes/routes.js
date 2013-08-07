if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

//////////
// Routes
//////////

define([
    'Router', 'Middlewares',

    '../controllers/UserAPIController',
    '../controllers/user/UserAssociationAPIController',
    '../controllers/user/UserAssociationsAPIController',

    '../controllers/AssociationAPIController',
    '../controllers/association/AssociationAdminAPIController',
    '../controllers/association/AssociationAdminsAPIController'

], function (Router, Middlewares,
             UserAC, UserAssociationAC, UserAssociationsAC,
             AssociationAC, AssociationAdminAC, AssociationAdminsAC) {

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
        app.get(    Routes._USER__ID_ASSOCIATIONS,
                    UserAssociationsAC.getAll       );

        // UserAssociationAC
        app.get(    Routes._USER__ID_ASSOCIATION,
                    UserAssociationAC.getById       );

        app.put(    Routes._USER__ID_ASSOCIATION,
                    UserAssociationAC.addById       );

        app.delete( Routes._USER__ID_ASSOCIATION,
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

        // AssociationAdminsAC
        app.get(    Routes._ASSOCIATION__ID_ADMINS,
                    AssociationAdminsAC.getAll      );

        // AssociationAdminAC


    }

    return exports;

});