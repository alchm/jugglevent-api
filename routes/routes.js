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

        /////////
        // UserAC
        app.get(    Routes._USER_userId,
                    UserAC.getUserById   );

        app.post(   Routes._USER,
                    UserAC.createUser    );

        app.put(    Routes._USER_userId,
                    UserAC.updateById    );

        app.delete( Routes._USER_userId,
                    UserAC.deleteById    );

        /////////////////////
        // UserAssociationsAC
        app.get(    Routes._USER_userId_ASSOCIATIONS,
                    UserAssociationsAC.getAll           );

        ////////////////////
        // UserAssociationAC
        app.get(    Routes._USER_userId_ASSOCIATION_aId,
                    UserAssociationAC.getById           );

        app.put(    Routes._USER_userId_ASSOCIATION_aId,
                    UserAssociationAC.addById           );

        app.delete( Routes._USER_userId_ASSOCIATION_aId,
                    UserAssociationAC.removeById        );

        ////////////////
        // AssociationAC
        app.get(    Routes._ASSOCIATION_aId,
                    AssociationAC.getById       );

        app.post(   Routes._ASSOCIATION,
                    AssociationAC.new           );

        app.put(    Routes._ASSOCIATION_aId,
                    AssociationAC.updateById    );

        app.delete( Routes._ASSOCIATION_aId,
                    AssociationAC.deleteById    );

        //////////////////////
        // AssociationAdminsAC
        app.get(    Routes._ASSOCIATION_aId_ADMINS,
                    AssociationAdminsAC.getAll      );

        /////////////////////
        // AssociationAdminAC
        app.get(    Routes._ASSOCIATION_aId_ADMIN_userId,
                    AssociationAdminAC.getById              );

        app.put(    Routes._ASSOCIATION_aId_ADMIN_userId,
                    AssociationAdminAC.addById              );

        app.delete( Routes._ASSOCIATION_aId_ADMIN_userId,
                    AssociationAdminAC.removeById           );

    };

    return exports;

});