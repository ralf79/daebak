'use strict';

/**
 * Wave Frontend app module
 * @type {angular.Module}
 */
console.log('------------------------------------------');
console.log('app.js');

var MyApp = window.MyApp = angular.module('MyApp',
        [
            'ngRoute',
//            'dialogs',
            // services  //
            'MyApp.common.service',
            'MyApp.user.service',
            'MyApp.board.service',
            // directive   //
            'MyApp.user.directive',
            'MyApp.board.directive',
            // controllers //
            'MyApp.ctrl',
            'MyApp.user.ctrl',
            'MyApp.board.ctrl',
            // etc  //
            'MyApp.Routes',
            'ui.bootstrap'
        ])
    ;

