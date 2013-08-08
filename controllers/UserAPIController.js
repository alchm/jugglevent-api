if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    'mongoose',
    'passport',
    'api/UserAPI',
    'api/AssociationAPI',
    'Router'
], function (mongoose, passport, UserAPI, AssociationAPI, Router) {

    var exports = {},
        City    = mongoose.model('City'),
        School  = mongoose.model('School'),
        Routes  = Router.getRoutes();

    exports.getUserById = function (req, res) {
        var userId = req.params.userId;
        UserAPI.getById(userId, function (err, data) {
            if (!err) {
                if (data) {
                    res.send({ response: data });
                } else {
                    res.send({ errors: err });
                }
            } else {
                res.send({ errors: err });
            }
        });
    };

    exports.createUser = function (req, res) {
        var userData = fetchData(req);
        UserAPI.new(userData, function (err, data) {
            if (!err) {
                if (data) {
                    res.send(data);
                } else res.send({});
            } else res.send(err);
        });
    };

    exports.updateById = function (req, res) {
        var userId;
        var userData;
        UserAPI.updateById(userId, userData, function (err, data) {
            if (!err) {
                if (data) res.send({ response: true });
                else res.send({ response: null });
            } else res.send({ error: err });
        });
    };

    exports.deleteById = function (req, res) {
       UserAPI.deleteById(userId, function (err) {
            if (!err) {
                res.send({ response: true });
            } else res.send({ error: err });
       });
    };

    /*
     Home page
     */
    exports.showHome = function(req, res) {
        if (req.user) {
            res.render('jugglevent-timeline.jade');
        } else {
            res.render('jugglevent-login.jade');
        }
    };

    /*
     Register user page
     */
    exports.showRegister = function(req, res) {
        if (!req.user)
            City.find({}, function(err, cities) {
                res.render('jugglevent-register-user.jade', {
                    cities: cities
                });
            });
        else res.redirect(Routes._HOME);
    };

    /*
     User dashboard page
     */
    exports.showDashboard = function(req, res) {
        if (req.user) {
            if (req.params.username == req.user.username) {
                res.render('user-dashboard.jade');
            } else UserAPI.getDashboardData(req.user, function(err, userData) {
                if (userData) {
                    if (!err) {
                        res.render('user-public-page.jade', { data: userData });
                    } else console.log(err);
                } else res.redirect(Routes._HOME);
            });
        } else res.redirect(Routes._HOME);
    }

    /*
     User modification page
     */
    exports.showAccount = function (req, res) {
        if (req.user) {
            if (req.user.username == req.params.username) {
                City.find({}).ne('_id', req.user.city).exec( function(err, cities) {
                    if (cities) {
                        City.findOne({ '_id': req.user.city }, function(err, userCity) {
                            UserAPI.getAssociations(req.user, function(err, data) {
                                res.render('user-account.jade', { cities : cities,
                                                             userCity : userCity,
                                                             associations : data.associations });
                            });
                        });
                    }
                });
            } else res.redirect(Routes.generate( Routes.__USER_PROFILE, { ':username': req.params.username } ));
        }
        else { console.log('no req user'); res.redirect(Routes._HOME); }
    }

    /*
     User authentication function
     */
    exports.auth = function(req, res) {
        if (!req.user) {
            if (req.form.isValid) {
                passport.authenticate('local', function(err, user) {
                    if (!err && user) {
                        req.logIn(user, function(err) {
                            if (!err) {
                                res.redirect(Routes._HOME);
                            } else {
                                res.redirect(Routes._HOME);
                            }
                        });
                    } else {
                        res.redirect(Routes._HOME);
                    }
                })(req,res);
            } else {
                res.redirect(Routes._HOME);
            }
        } else { res.redirect(Routes._HOME); }
    }

    /*
     Logout function
     */
    exports.logout = function(req, res){
        /*
         Erase session and use Passport.js logout function
         Then redirect to '/'
         */
        req.session = null;
        req.logout();
        res.redirect(Routes._HOME);
    };

    /*
     Register function
     */
    exports.register = function(req, res) {
        /*
         If there's no connected user and if the form validator passed
         It creates a new user using the user API
         Then we redirect to the home page
         */
        if (!req.user){
            if (req.form.isValid) {
                UserAPI.new(req.body, function (err, user) {
                    if (!err) {
                        res.redirect(Routes._HOME);
                    } else {
                        res.redirect(Routes._USER_REGISTER);
                    }
                });

                // If the form is not valid
            } else {
                res.redirect(Routes._USER_REGISTER);
            }

            /*
             If a user is logged in, we redirect
             */
        } else res.redirect(Routes._HOME);
    }

    /*
     Update user function
     */
    exports.update = function(req, res) {
        /*
         If there's no connected user and if the form validator passed
         It updates the user using the user API
         Then we redirect to the home page
         */
        if (req.user)
            if (req.form.isValid) {
                UserAPI.update(req.user._id, req.body, function (err, user) {
                    if (!err) {
                        res.redirect(Routes.generate( Routes.__USER_ACCOUNT, {":username" : req.user.username} ));
                    } else {
                        res.redirect(Routes.generate( Routes.__USER_ACCOUNT, {":username" : req.user.username} ));
                    }
                });
            } else {
                res.redirect(Routes.generate( Routes.__USER_ACCOUNT, {":username" : req.user.username} ));
            }
        else res.redirect(Routes._HOME);
    }

    /*
     Save the user language preference
     */
    exports.updateLanguage = function(req, res) {
        if (req.user) {
            if (req.form.isValid) {
                UserAPI.updateLanguage(req.user._id, req.body, function(err, user) {
                    if (!err) {
                        res.redirect( Routes.generate( Routes.__USER_ACCOUNT, {":username" : req.user.username} ));
                    } else {
                        res.redirect( Routes.generate( Routes.__USER_ACCOUNT, {":username" : req.user.username} ));
                    }
                });
            } else {
                res.redirect( Routes.generate( Routes.__USER_ACCOUNT_UPDATE, { ":username" : req.user.username} ));
            }
        } else res.redirect(Routes._HOME);
    }

    return exports;

});

// POPULATING CITIES DATABASE :
/*
 var city = new City();
 city.name = "Montréal";
 city.save(function(err){
 if (!err) res.send('Montréal created :)');
 else res.send("Montréal not created :(");
 });
 */

// POPULATING SCHOOLS DATABASES
/*
 var school = new School();
 school.name = "HEC Montréal";
 school.save(function(err){
 if (!err) res.send('HEC Montréal created :)');
 else res.send("HEC Montréal not created :(");
 });
 */